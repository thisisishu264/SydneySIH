-- Select the new database to work on
USE sih_schemes_new;

-- Create the Users table
CREATE TABLE Users (
                       user_id INT AUTO_INCREMENT PRIMARY KEY,
                       full_name VARCHAR(255) NOT NULL,
                       aadhar_number VARCHAR(12) UNIQUE NOT NULL,
                       pan_number VARCHAR(10) UNIQUE,
                       profile_data JSON
);

-- Create the Schemes table with new columns
CREATE TABLE Schemes (
                         scheme_id INT AUTO_INCREMENT PRIMARY KEY,
                         scheme_name VARCHAR(255) NOT NULL,
                         description TEXT,
                         benefits TEXT,
                         eligibility_criteria_json JSON,
                         required_documents_json JSON
);

-- Create the table for logical rules
CREATE TABLE EligibilityRules (
                                  rule_id INT AUTO_INCREMENT PRIMARY KEY,
                                  scheme_id INT,
                                  rules JSON,
                                  FOREIGN KEY (scheme_id) REFERENCES Schemes(scheme_id)
);

-- Create the table to track applications
CREATE TABLE Applications (
                              app_id INT AUTO_INCREMENT PRIMARY KEY,
                              user_id INT,
                              scheme_id INT,
                              status VARCHAR(50) DEFAULT 'Submitted',
                              submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              FOREIGN KEY (user_id) REFERENCES Users(user_id),
                              FOREIGN KEY (scheme_id) REFERENCES Schemes(scheme_id)
);