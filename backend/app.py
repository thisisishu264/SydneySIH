import json
import random
import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS  # <-- ADD THIS IMPORT
import mysql.connector
from mysql.connector import Error
import os

# --- Configuration & Setup ---

app = Flask(__name__)
CORS(app)  # <-- ADD THIS LINE TO ENABLE FRONTEND-BACKEND COMMUNICATION

# Load the synthetic DigiLocker database from the JSON file
def load_synthetic_db(filename="digilocker_synthetic_2000.json"):
    """Loads the synthetic user data from a JSON file."""
    filepath = os.path.join(os.path.dirname(__file__), filename)
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"FATAL ERROR: The synthetic database file '{filename}' was not found.")
        return {}
    except json.JSONDecodeError:
        print(f"FATAL ERROR: Could not decode JSON from '{filename}'. Check for syntax errors.")
        return {}

# Connect to your MySQL Database
DB_CONFIG = {
    'host': '127.0.0.1',  # Or your MySQL host
    'user': 'root',
    'password': 'password',  # IMPORTANT: Use a strong password in production
    'database': 'SYDNEY'
}

def create_db_connection():
    """Creates and returns a connection to the MySQL database."""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
    return None

# Load the synthetic data into memory when the app starts
SYNTHETIC_DIGILOCKER_DB = load_synthetic_db()

# --- EXISTING API Endpoints (No changes needed here) ---

@app.route('/initiate-auth', methods=['POST'])
def initiate_auth():
    data = request.get_json()
    aadhar_number = data.get('aadhar_number')
    phone_number = data.get('phone_number')

    if not aadhar_number or not phone_number:
        return jsonify({"error": "Aadhaar number and phone number are required"}), 400

    if aadhar_number not in SYNTHETIC_DIGILOCKER_DB:
        return jsonify({"error": "Aadhaar number not found in government records"}), 404

    stored_phone = SYNTHETIC_DIGILOCKER_DB[aadhar_number]['user_info'].get('phone_number')
    if stored_phone != phone_number:
        return jsonify({"error": "Phone number does not match Aadhaar records"}), 401

    db_conn = create_db_connection()
    if not db_conn:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = db_conn.cursor(dictionary=True) # Use dictionary=True for easier access
    is_new_user = False
    
    try:
        cursor.execute("SELECT user_id, phone_number FROM users WHERE aadhar_number = %s", (aadhar_number,))
        user_record = cursor.fetchone()
        
        otp = str(random.randint(100000, 999999))
        otp_expiry = datetime.datetime.now() + datetime.timedelta(minutes=10)

        if user_record:
            if user_record['phone_number'] != phone_number:
                return jsonify({"error": "Phone number mismatch in user records"}), 401
            cursor.execute(
                "UPDATE users SET otp_code = %s, otp_expiry = %s WHERE aadhar_number = %s",
                (otp, otp_expiry, aadhar_number)
            )
        else:
            is_new_user = True
            cursor.execute(
                "INSERT INTO users (aadhar_number, phone_number, otp_code, otp_expiry) VALUES (%s, %s, %s, %s)",
                (aadhar_number, phone_number, otp, otp_expiry)
            )

        db_conn.commit()
        print(f"OTP for Aadhaar {aadhar_number} is: {otp}")

        return jsonify({
            "message": "OTP sent successfully.",
            "is_new_user": is_new_user
        }), 200

    except Error as e:
        print(f"Database Error: {e}")
        return jsonify({"error": "An internal database error occurred"}), 500
    finally:
        cursor.close()
        db_conn.close()


@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    aadhar_number = data.get('aadhar_number')
    otp = data.get('otp')

    if not aadhar_number or not otp:
        return jsonify({"error": "Aadhaar and OTP are required"}), 400

    db_conn = create_db_connection()
    if not db_conn:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = db_conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT user_id, name, otp_code, otp_expiry FROM users WHERE aadhar_number = %s", (aadhar_number,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "Authentication failed. Please start again."}), 404
        
        if user['otp_code'] != otp:
            return jsonify({"error": "Invalid OTP"}), 401
        
        if datetime.datetime.now() > user['otp_expiry']:
            return jsonify({"error": "OTP has expired"}), 401
        
        if user['name']:
            return jsonify({
                "status": "LOGIN_SUCCESS",
                "message": "Welcome back!",
                "user_id": user['user_id'],
                "name": user['name']
            }), 200
        else:
            return jsonify({
                "status": "REGISTRATION_OTP_VERIFIED",
                "message": "Please complete your profile information.",
                "user_id": user['user_id']
            }), 200

    except Error as e:
        print(f"Database Error: {e}")
        return jsonify({"error": "An internal database error occurred"}), 500
    finally:
        cursor.close()
        db_conn.close()


@app.route('/complete-profile', methods=['POST'])
def complete_profile():
    data = request.get_json()
    user_id = data.get('user_id')
    income = data.get('annual_income')
    caste = data.get('caste_category')
    occupation = data.get('occupation')
    special_status = data.get('special_status')

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    db_conn = create_db_connection()
    if not db_conn:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = db_conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT aadhar_number FROM users WHERE user_id = %s", (user_id,))
        user_record = cursor.fetchone()
        if not user_record:
            return jsonify({"error": "Invalid user ID"}), 404
        aadhar_number = user_record['aadhar_number']
        
        digilocker_data = SYNTHETIC_DIGILOCKER_DB.get(aadhar_number)
        if not digilocker_data:
                 return jsonify({"error": "Could not retrieve user data from DigiLocker"}), 500
        
        user_info = digilocker_data['user_info']

        # This part remains the same
        update_query = """
            UPDATE users SET
                name = %s, dob = %s, address = %s, state = %s, district = %s,
                gender = %s, annual_income = %s, caste_category = %s,
                occupation = %s, special_status = %s,
                otp_code = NULL, otp_expiry = NULL
            WHERE user_id = %s
        """
        full_address = user_info.get('address', '')
        address_parts = [part.strip() for part in full_address.split(',')]
        state = address_parts[-2] if len(address_parts) >= 2 else ''
        district = address_parts[-3] if len(address_parts) >= 3 else ''

        cursor.execute(update_query, (
            user_info.get('name'), user_info.get('dob'), full_address, state, district,
            user_info.get('gender'), income, caste, occupation, special_status,
            user_id
        ))

        # --- NEW DYNAMIC DOCUMENT LOGIC ---
        # We no longer use a hardcoded doc_type_map.
        
        linked_documents = digilocker_data.get('linked_documents', {})

        for doc_key, doc_data in linked_documents.items():
            # The new logic: if the document data exists (is not null), process it.
            if doc_data:
                # Automatically format the doc_key (e.g., "family_id" -> "FamilyId")
                # This makes the document_type in the DB clean and consistent.
                doc_type = doc_key.replace('_', ' ').title().replace(' ', '')
                
                doc_path = doc_data.get('document_path', '')

                cursor.execute(
                    """
                    INSERT INTO user_documents (user_id, document_type, document_path, extracted_data)
                    VALUES (%s, %s, %s, %s)
                    ON DUPLICATE KEY UPDATE document_path=VALUES(document_path), extracted_data=VALUES(extracted_data)
                    """,
                    (user_id, doc_type, doc_path, json.dumps(doc_data))
                )

        db_conn.commit()

        return jsonify({
            "status": "REGISTRATION_COMPLETE",
            "message": f"Welcome, {user_info.get('name')}! Your profile is now complete.",
            "user_id": user_id,
            "name": user_info.get('name')
        }), 200

    except Error as e:
        print(f"Database Error: {e}")
        db_conn.rollback()
        return jsonify({"error": "An internal database error occurred"}), 500
    finally:
        cursor.close()
        db_conn.close()

# --- NEW ENDPOINTS FOR MVP ---

@app.route('/eligibleSchemes', methods=['GET'])
def get_eligible_schemes():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    db_conn = create_db_connection()
    if not db_conn:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = db_conn.cursor(dictionary=True)
    try:
        # 1. Fetch user profile from your 'users' table to get eligibility criteria
        cursor.execute("SELECT DATEDIFF(CURDATE(), dob) / 365.25 AS age, state, annual_income, gender, caste_category, special_status FROM users WHERE user_id = %s", (user_id,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "User not found"}), 404
            
        # 2. Build and run the SQL query to find matching schemes
        # This query checks multiple conditions for eligibility.
        query = """
            SELECT scheme_id, scheme_name, scheme_description, benefit_summary 
            FROM schemes
            WHERE (min_age IS NULL OR %s >= min_age)
            AND (max_age IS NULL OR %s <= max_age)
            AND (eligible_gender = 'Any' OR eligible_gender = %s)
            AND (target_state IS NULL OR target_state = %s)
            AND (max_income IS NULL OR %s <= max_income)
            AND (caste_category IS NULL OR FIND_IN_SET(%s, caste_category))
        """
        params = (user['age'], user['age'], user['gender'], user['state'], user['annual_income'], user['caste_category'])

        cursor.execute(query, params)
        schemes = cursor.fetchall()

        return jsonify(schemes), 200

    except Error as e:
        print(f"Database Error: {e}")
        return jsonify({"error": "An internal database error occurred"}), 500
    finally:
        cursor.close()
        db_conn.close()


@app.route('/submitApplication', methods=['POST'])
def submit_application():
    data = request.get_json()
    user_id = data.get('user_id')
    scheme_id = data.get('scheme_id')

    if not user_id or not scheme_id:
        return jsonify({"error": "User ID and Scheme ID are required"}), 400

    db_conn = create_db_connection()
    if not db_conn:
        return jsonify({"error": "Database connection failed"}), 500
    
    cursor = db_conn.cursor()
    try:
        # The 'status' is 'Submitted' by default
        query = "INSERT INTO applications (user_id, scheme_id, status) VALUES (%s, %s, 'Submitted')"
        cursor.execute(query, (user_id, scheme_id))
        db_conn.commit()
        return jsonify({"message": "Application submitted successfully"}), 201
    except Error as e:
        print(f"Database Error: {e}")
        return jsonify({"error": f"Database error: {e}"}), 500
    finally:
        cursor.close()
        db_conn.close()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)