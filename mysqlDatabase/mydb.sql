
CREATE DATABASE SYDNEY;
USE SYDNEY;

-- Users Table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(15) UNIQUE NOT NULL, 
    aadhar_number VARCHAR(12) UNIQUE,
    name VARCHAR(100),
    dob DATE,
    address TEXT,
    state VARCHAR(100), 
    district VARCHAR(100), 
    occupation VARCHAR(100), 
    annual_income INT, 
    otp_code VARCHAR(6), 
    otp_expiry TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. User Documents Table 
CREATE TABLE user_documents (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    document_type ENUM('Aadhaar', 'PAN', 'RationCard', 'Domicile', 'Marksheet10', 'Marksheet12'),
    document_path VARCHAR(255) NOT NULL,
    extracted_data JSON,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 3. Schemes Table
CREATE TABLE schemes (
    scheme_id INT AUTO_INCREMENT PRIMARY KEY,
    scheme_name VARCHAR(255) NOT NULL,
    governing_body VARCHAR(255),
    benefit_highlight TEXT NOT NULL,
    eligibility_summary TEXT NOT NULL,
    full_details_link VARCHAR(255),
    target_age_min INT DEFAULT 0,
    target_age_max INT DEFAULT 100,
    target_occupations JSON, 
    target_states JSON, 
    target_income_max INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Applications Table
CREATE TABLE applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    scheme_id INT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'In-Review', 'Approved', 'Rejected') DEFAULT 'Pending',
    assigned_official_id INT, 
    rejection_reason TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (scheme_id) REFERENCES schemes(scheme_id)
);

-- 5. NEW: Application Documents Linking Table
CREATE TABLE application_documents (
    application_id INT NOT NULL,
    document_id INT NOT NULL,
    PRIMARY KEY (application_id, document_id),
    FOREIGN KEY (application_id) REFERENCES applications(application_id),
    FOREIGN KEY (document_id) REFERENCES user_documents(document_id)
);

-- 6. Government Officials Table 
CREATE TABLE officials (
    official_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    designation ENUM('State Officer', 'District Officer', 'Block Officer'),
    region VARCHAR(100),
    username VARCHAR(50) UNIQUE,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 7. Application Status Log Table 
CREATE TABLE application_status_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    status ENUM('Pending', 'In-Review', 'Approved', 'Rejected'),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by_official_id INT,
    comment TEXT,
    FOREIGN KEY (application_id) REFERENCES applications(application_id),
    FOREIGN KEY (changed_by_official_id) REFERENCES officials(official_id)
);

-- 8. Sydney's Knowledge Base 
CREATE TABLE faq_knowledge_base (
    faq_id INT AUTO_INCREMENT PRIMARY KEY,
    context_trigger VARCHAR(100) NOT NULL, 
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL,
    language VARCHAR(10) DEFAULT 'en-IN' 
);

ALTER TABLE users
ADD COLUMN gender ENUM('Male', 'Female', 'Other'),
ADD COLUMN caste_category ENUM('General', 'OBC', 'SC', 'ST', 'EWS');