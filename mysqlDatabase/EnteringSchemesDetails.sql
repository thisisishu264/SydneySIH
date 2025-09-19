USE sydney ;

INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max
) VALUES (
    'Delhi Pension Scheme to Women in Distress (Widow Pension)',
    'Department of Women and Child Development, Government of NCT of Delhi',
    'Monthly pension of ₹2500 per head, directly transferred to bank account through ECS/PFMS.',
    'Widows, divorced, separated, abandoned, deserted or destitute women residing in Delhi for 5+ years, aged 18 years and above, with annual income not exceeding ₹1,00,000, not receiving any other pension.',
    'https://wcd.delhi.gov.in/wcd/delhi-pension-scheme-women-distress-widows-divorced-separated-destitute-abandoned-women',
    18,
    100,
    JSON_ARRAY('Unemployed', 'Housewife', 'Widow', 'Separated Woman', 'Destitute Woman'),
    JSON_ARRAY('Delhi'),
    100000
);

INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max
) VALUES (
    'Widow’s Daughter Marriage Scheme',
    'Department of Women and Child Development, Government of NCT of Delhi',
    'One-time financial assistance of ₹30,000 for marriage of up to two daughters of widows, or orphan girls under guardianship.',
    'Widows residing in Delhi for 5+ years with income under ₹1,00,000, not receiving other pensions. Assistance applicable for daughters aged 18+ at the time of marriage, up to two daughters. Orphan girls under guardianship also eligible.',
    'https://wcd.delhi.gov.in/wcd/delhi-pension-scheme-women-distress-widows-divorced-separated-destitute-abandoned-women',
    18,
    100,
    JSON_ARRAY('Widow', 'Guardian of Orphan Girl'),
    JSON_ARRAY('Delhi'),
    100000
);

ALTER TABLE schemes
ADD COLUMN target_gender ENUM('Male', 'Female', 'Other') DEFAULT NULL,
ADD COLUMN target_caste_category JSON DEFAULT NULL;

-- Turn off safe mode for this session
SET SQL_SAFE_UPDATES = 0;

-- Run your original UPDATE commands (they will work now)
UPDATE SYDNEY.schemes SET target_gender = 'Female', target_caste_category = JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS') WHERE scheme_name = 'Delhi Pension Scheme to Women in Distress (Widow Pension)';
UPDATE SYDNEY.schemes SET target_gender = 'Female', target_caste_category = JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS') WHERE scheme_name = 'Widow’s Daughter Marriage Scheme';

-- Turn safe mode back on (good practice)
SET SQL_SAFE_UPDATES = 1;

ALTER TABLE schemes
ADD COLUMN display_summary TEXT;

UPDATE schemes
SET 
    display_summary = 'हर महीने ₹2500 की पेंशन##दिल्ली में 5 साल से ज़्यादा से रह रही हों\nसालाना आमदनी ₹1,00,000 से कम हो\nकिसी और तरह की पेंशन ना मिल रही हो\nउम्र 18 साल से ज़्यादा हो'
WHERE 
    scheme_name = 'Delhi Pension Scheme to Women in Distress (Widow Pension)';
    
UPDATE schemes
SET 
    display_summary = 'बेटी की शादी के लिए ₹30,000 की मदद##दिल्ली में 5 साल से ज़्यादा से रह रही हों\nसालाना आमदनी ₹1,00,000 से कम हो\nबेटी की उम्र शादी के समय 18 साल से ज़्यादा हो\nयह मदद ज़्यादा से ज़्यादा दो बेटियों के लिए है'
WHERE 
    scheme_name = 'Widow’s Daughter Marriage Scheme';
    
ALTER TABLE schemes
ADD COLUMN required_documents JSON;

UPDATE schemes
SET
    required_documents = JSON_ARRAY(
        'Aadhaar Card',
        'Bank Passbook (single account)',
        'Delhi Residence Proof (5+ years)',
        'Husband''s Death Certificate',
        'Self-Declaration Form'
    )
WHERE
    scheme_name = 'Delhi Pension Scheme to Women in Distress (Widow Pension)';
    
UPDATE schemes
SET
    required_documents = JSON_ARRAY(
        'Applicant''s (Widow) Aadhaar Card',
        'Husband''s Death Certificate',
        'Daughter''s Age Proof (Aadhaar or Birth Certificate)',
        'Daughter''s Wedding Invitation Card',
        'Delhi Residence Proof (5+ years)',
        'Income Certificate',
        'Applicant''s Bank Passbook',
        'Self-Declaration Form'
    )
WHERE
    scheme_name = 'Widow’s Daughter Marriage Scheme';
    
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Pradhan Mantri MUDRA Yojana (PMMY)',
    'Ministry of Finance, Government of India',
    'Collateral-free loans up to ₹10 lakh for micro and small businesses, under Shishu, Kishore, and Tarun categories.',
    'Any Indian citizen with a viable business plan for non-farm income-generating activity in manufacturing, trading, or services sector, including allied agriculture activities. Loans are available for new and existing businesses. No minimum income limit is specified.',
    'https://www.mudra.org.in/',
    18,
    65,
    JSON_ARRAY('Small Entrepreneur', 'Shopkeeper', 'Trader', 'Service Provider', 'Manufacturer'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'बिना गारंटी के बिज़नेस लोन\n₹50,000 तक शिशु, ₹50,001-₹5,00,000 किशोर, ₹5,00,001-₹10,00,000 तरुण श्रेणी में\nमैन्युफैक्चरिंग, ट्रेडिंग, सर्विस के लिए',
    JSON_ARRAY(
        'Aadhaar Card',
        'Business Plan',
        'PAN Card',
        'Bank Account Details',
        'Address Proof',
        'Identity Proof'
    )
);

INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Antyodaya Anna Yojana (AAY)',
    'Department of Food & Public Distribution, Ministry of Consumer Affairs, Food and Public Distribution, Government of India',
    'Highly subsidized food grains (35 kg per family per month) at ₹3/kg for rice and ₹2/kg for wheat.',
    'Poorest of the poor families identified by the State Governments/UT Administrations. Priority is given to landless agricultural laborers, marginal farmers, rural artisans, destitute, widows, disabled persons, and aged persons with no assured means of subsistence or societal support.',
    'https://dfpd.gov.in/pds-antyodaya-anna-yojana.htm',
    NULL,
    NULL,
    JSON_ARRAY('Landless Labourer', 'Marginal Farmer', 'Rural Artisan', 'Widow', 'Destitute', 'Elderly Poor', 'Disabled Person'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'गरीब से गरीब परिवार को प्रति माह 35 किलो अनाज\nचावल ₹3/किलो, गेहूं ₹2/किलो\nराज्य सरकार द्वारा पहचान की गई पात्र परिवारों को ही लाभ',
    JSON_ARRAY(
        'Ration Card Application Form',
        'Proof of Residence',
        'Income Certificate (if applicable)',
        'Caste Certificate (if applicable)',
        'Photographs of Family Members',
        'Any Other Document as Prescribed by State Authority'
    )
);

-- 1. PM SVANidhi
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi)',
    'Ministry of Housing and Urban Affairs, Government of India',
    'Collateral-free working capital loans up to ₹50,000 for street vendors, repayable in easy installments with interest subsidy.',
    'Street vendors/hawkers engaged in vending in urban areas on or before March 24, 2020. Must possess Certificate of Vending or Letter of Recommendation from ULB/Town Vending Committee.',
    'https://pmsvanidhi.mohua.gov.in/',
    18,
    65,
    JSON_ARRAY('Street Vendor', 'Hawker', 'Rehri-Patri Wala'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'स्ट्रीट वेंडर्स को बिना गारंटी लोन\nपहला लोन ₹10,000 फिर समय पर भुगतान पर ₹20,000 और ₹50,000 तक\nब्याज सब्सिडी और डिजिटल ट्रांजैक्शन प्रोत्साहन',
    JSON_ARRAY(
        'Aadhaar Card',
        'Certificate of Vending or Letter of Recommendation',
        'Bank Account Details',
        'Passport Size Photo',
        'Mobile Number'
    )
);

-- 2. Prime Minister’s Employment Generation Programme (PMEGP)
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Prime Minister’s Employment Generation Programme (PMEGP)',
    'Ministry of Micro, Small and Medium Enterprises, Government of India',
    'Subsidy on loans up to ₹25 lakh for manufacturing and ₹10 lakh for service sector projects to set up micro-enterprises.',
    'Any individual aged 18+, Self Help Groups, Societies, Trusts, and Charitable Institutions. Minimum educational qualification: 8th standard pass for projects above ₹10 lakh (manufacturing) and ₹5 lakh (services).',
    'https://www.kviconline.gov.in/pmegp/',
    18,
    65,
    JSON_ARRAY('Entrepreneur', 'Self Help Group Member', 'Co-operative Society'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'मैन्युफैक्चरिंग के लिए ₹25 लाख तक और सर्विस के लिए ₹10 लाख तक लोन\n35% तक सब्सिडी\nनई माइक्रो यूनिट खोलने में मदद',
    JSON_ARRAY(
        'Aadhaar Card',
        'Project Report',
        'Educational Qualification Proof',
        'Caste Certificate (if applicable)',
        'Bank Account Details'
    )
);

-- 3. Banglar Awas Yojna (West Bengal Specific)
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Banglar Awas Yojna',
    'Department of Panchayats & Rural Development, Government of West Bengal',
    'Financial assistance for construction of pucca house with basic facilities for rural poor.',
    'Rural households without a pucca house, or with kutcha/dilapidated house. Priority to SC/ST, minority and vulnerable families.',
    'https://panchayat.gov.in/',
    NULL,
    NULL,
    JSON_ARRAY('Rural Poor Household'),
    JSON_ARRAY('West Bengal'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'पक्का घर बनाने के लिए वित्तीय सहायता\nसभी पात्र ग्रामीण गरीब परिवारों को लाभ',
    JSON_ARRAY(
        'Aadhaar Card',
        'BPL Card or Socio-economic Caste Census Identification',
        'Residence Proof',
        'Photograph',
        'Bank Account Details'
    )
);

-- 4. Stand-Up India Scheme
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Stand-Up India Scheme',
    'Department of Financial Services, Ministry of Finance, Government of India',
    'Bank loans between ₹10 lakh and ₹1 crore for setting up new enterprise in manufacturing, services, trading, or agri-allied sector.',
    'Available to SC/ST and Women entrepreneurs above 18 years. Greenfield project must be a first-time venture of the beneficiary.',
    'https://www.standupmitra.in/',
    18,
    65,
    JSON_ARRAY('Entrepreneur', 'Women Entrepreneur', 'SC/ST Entrepreneur'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('SC', 'ST', 'Women'),
    '₹10 लाख से ₹1 करोड़ तक लोन\nSC/ST और महिला उद्यमियों के लिए\nनया बिज़नेस (ग्रीनफ़ील्ड प्रोजेक्ट) शुरू करने में सहायता',
    JSON_ARRAY(
        'Aadhaar Card',
        'Caste Certificate (for SC/ST)',
        'Business Plan',
        'PAN Card',
        'Bank Account Details'
    )
);

-- 5. Atal Pension Yojana
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Atal Pension Yojana (APY)',
    'Pension Fund Regulatory and Development Authority (PFRDA)',
    'Guaranteed pension of ₹1,000 to ₹5,000 per month after 60 years, depending on contribution.',
    'All Indian citizens aged 18-40 years with a savings bank account. Monthly contribution required till 60 years of age.',
    'https://www.npscra.nsdl.co.in/scheme-details.php',
    18,
    40,
    JSON_ARRAY('Any Citizen'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    '₹1,000 से ₹5,000 तक मासिक पेंशन\n18-40 वर्ष के सभी नागरिकों के लिए\n60 वर्ष तक नियमित योगदान आवश्यक',
    JSON_ARRAY(
        'Aadhaar Card',
        'Bank Account Details',
        'Mobile Number'
    )
);

-- 6. PM Fasal Bima Yojana
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    'Ministry of Agriculture & Farmers Welfare, Government of India',
    'Crop insurance with low premium rates for farmers against natural calamities, pests & diseases.',
    'All farmers growing notified crops in notified areas including tenant/sharecroppers. Must have insurable interest in crop sown.',
    'https://pmfby.gov.in/',
    18,
    70,
    JSON_ARRAY('Farmer', 'Tenant Farmer', 'Sharecropper'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'फसल बीमा कम प्रीमियम दर पर\nप्राकृतिक आपदा, कीट, रोग से होने वाले नुकसान पर कवरेज',
    JSON_ARRAY(
        'Aadhaar Card',
        'Land Records or Lease Agreement',
        'Bank Account Details',
        'Crop Sowing Proof'
    )
);

-- 7. Ayushman Bharat Yojana (PM-JAY)
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    'National Health Authority, Government of India',
    'Health insurance cover of ₹5 lakh per family per year for secondary and tertiary care hospitalization.',
    'Poor and vulnerable families as per SECC 2011 data. No restriction on family size, age, or gender.',
    'https://pmjay.gov.in/',
    NULL,
    NULL,
    JSON_ARRAY('Any Citizen (Eligible Family)'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'परिवार को ₹5 लाख का मुफ्त हेल्थ कवरेज\nद्वितीयक और तृतीयक उपचार के लिए कैशलेस अस्पताल में भर्ती',
    JSON_ARRAY(
        'Aadhaar Card',
        'Ration Card/SECC Proof',
        'Photographs',
        'Any Government ID'
    )
);

-- 8. PM Kisan Samman Nidhi
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'PM Kisan Samman Nidhi',
    'Ministry of Agriculture & Farmers Welfare, Government of India',
    'Direct income support of ₹6,000 per year in 3 installments to all eligible farmer families.',
    'All landholding farmer families except institutional landholders and higher income category beneficiaries.',
    'https://pmkisan.gov.in/',
    NULL,
    NULL,
    JSON_ARRAY('Farmer'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    '₹6,000 वार्षिक सहायता सीधे खाते में\nसभी छोटे और सीमांत किसानों के लिए',
    JSON_ARRAY(
        'Aadhaar Card',
        'Landholding Papers',
        'Bank Account Details'
    )
);

-- 9. PM Matsya Sampada Yojana
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Pradhan Mantri Matsya Sampada Yojana (PMMSY)',
    'Department of Fisheries, Ministry of Fisheries, Animal Husbandry and Dairying, Government of India',
    'Financial assistance for fisheries development including infrastructure, marketing, and aquaculture support.',
    'All fishers, fish farmers, fish workers, entrepreneurs and cooperatives engaged in fisheries and aquaculture activities.',
    'https://pmmsy.dof.gov.in/',
    NULL,
    NULL,
    JSON_ARRAY('Fisher', 'Fish Farmer', 'Entrepreneur in Fisheries'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'मछली पालन और मत्स्य क्षेत्र के विकास के लिए वित्तीय सहायता\nढांचागत सुविधाएं और मार्केटिंग सहायता',
    JSON_ARRAY(
        'Aadhaar Card',
        'Bank Account Details',
        'Fishermen ID Card (if available)',
        'Project Proposal'
    )
);

-- 10. Production Linked Incentive (PLI) Scheme
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Production Linked Incentive (PLI) Scheme',
    'Department for Promotion of Industry and Internal Trade, Ministry of Commerce & Industry, Government of India',
    'Financial incentive to boost domestic manufacturing and attract large investments in specific sectors.',
    'Manufacturers in notified sectors producing goods in India and meeting incremental production and investment criteria.',
    'https://dpiit.gov.in/',
    NULL,
    NULL,
    JSON_ARRAY('Manufacturer', 'Industry Player'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'निर्माण क्षेत्र में उत्पादन बढ़ाने पर प्रोत्साहन राशि\nघरेलू उत्पादन और निवेश को बढ़ावा',
    JSON_ARRAY(
        'Incorporation/Company Documents',
        'Production Data',
        'Investment Proof',
        'Bank Account Details'
    )
);

-- 1. Capital Investment Subsidy Scheme
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Capital Investment Subsidy Scheme',
    'Ministry of Agriculture & Farmers Welfare, Government of India',
    'Capital subsidy for setting up compost units, bio-fertilizer units, and waste management facilities.',
    'Individuals, farmers, cooperatives, SHGs, NGOs, and private entrepreneurs engaged in organic farming and waste management projects.',
    'https://agricoop.gov.in/',
    NULL,
    NULL,
    JSON_ARRAY('Farmer', 'Entrepreneur', 'SHG Member', 'NGO'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'कम्पोस्ट, बायो-फर्टिलाइज़र, कचरा प्रबंधन इकाइयों के लिए पूंजी सब्सिडी\nसभी राज्यों में पात्र आवेदकों को लाभ',
    JSON_ARRAY(
        'Aadhaar Card',
        'Project Proposal',
        'Land Documents',
        'Bank Account Details'
    )
);

-- 2. Digital India
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Digital India Programme',
    'Ministry of Electronics and Information Technology, Government of India',
    'Initiative to transform India into a digitally empowered society and knowledge economy.',
    'Available to all citizens, entrepreneurs, startups, and government agencies for e-governance, digital services, and digital literacy programs.',
    'https://digitalindia.gov.in/',
    NULL,
    NULL,
    JSON_ARRAY('Citizen', 'Entrepreneur', 'Student', 'Startup'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'डिजिटल सेवाएं, ऑनलाइन गवर्नेंस और डिजिटल साक्षरता को बढ़ावा\nसभी नागरिकों और उद्यमियों के लिए अवसर',
    JSON_ARRAY(
        'Aadhaar Card (for digital identity)',
        'Mobile Number',
        'Bank Account (for DBT services)'
    )
);

-- 3. PM Vishwakarma
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'PM Vishwakarma Yojana',
    'Ministry of Micro, Small and Medium Enterprises, Government of India',
    'Financial support, skill training, toolkit incentive, and collateral-free credit up to ₹3 lakh for traditional artisans and craftspeople.',
    'Traditional artisans/craftspeople working with hands and tools in 18 trades such as carpenter, blacksmith, potter, cobbler, etc.',
    'https://pmvishwakarma.gov.in/',
    18,
    65,
    JSON_ARRAY('Carpenter', 'Blacksmith', 'Potter', 'Cobbler', 'Tailor', 'Artisan'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'हस्तशिल्पियों और कारीगरों के लिए ₹3 लाख तक बिना गारंटी का लोन\nकौशल प्रशिक्षण और टूलकिट सहायता',
    JSON_ARRAY(
        'Aadhaar Card',
        'Proof of Traditional Occupation',
        'Bank Account Details',
        'Photograph'
    )
);

-- 4. Pradhan Mantri Garib Kalyan Yojana
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Pradhan Mantri Garib Kalyan Yojana (PMGKY)',
    'Government of India',
    'Free food grains, direct cash transfers, and other benefits to poor households especially during emergencies (e.g., COVID-19 pandemic).',
    'Priority Household Ration Card holders, Antyodaya Anna Yojana card holders, migrant workers, and other poor households identified by government.',
    'https://www.pib.gov.in/pmgky',
    NULL,
    NULL,
    JSON_ARRAY('BPL Household', 'Migrant Worker'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    '5 किलो अनाज प्रति व्यक्ति मुफ्त\nगरीब परिवारों के लिए नगद लाभ और सामाजिक सुरक्षा कवरेज',
    JSON_ARRAY(
        'Ration Card',
        'Aadhaar Card',
        'Bank Account Details'
    )
);

-- 5. Atal Bhujal Yojana
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Atal Bhujal Yojana',
    'Ministry of Jal Shakti, Government of India',
    'Community-led groundwater management programme in water-stressed areas.',
    'Gram Panchayats, Water User Associations, and communities in selected districts of participating states. Focus on participatory groundwater management.',
    'https://jalshakti-dowr.gov.in/atal-bhujal-yojana',
    NULL,
    NULL,
    JSON_ARRAY('Farmer Group', 'Water User Association', 'Gram Panchayat'),
    JSON_ARRAY('Gujarat', 'Haryana', 'Karnataka', 'Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Uttar Pradesh'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'जल संकटग्रस्त क्षेत्रों में भूजल प्रबंधन\nग्राम पंचायत और समुदाय द्वारा संचालित योजना',
    JSON_ARRAY(
        'Gram Panchayat Resolution',
        'Community Participation Proof',
        'Water Usage Data'
    )
);

-- 6. Atmanirbhar Bharat Abhiyan
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Atmanirbhar Bharat Abhiyan',
    'Government of India',
    'Economic relief package including credit guarantee, liquidity support, and reforms for MSMEs, farmers, and poor households.',
    'MSMEs, farmers, migrant workers, street vendors, and other vulnerable groups as per scheme components.',
    'https://www.pmindia.gov.in/atmanirbharbharat',
    NULL,
    NULL,
    JSON_ARRAY('MSME', 'Farmer', 'Street Vendor', 'Migrant Worker'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'आत्मनिर्भर भारत पैकेज - MSMEs, किसानों और गरीब परिवारों के लिए सहायता\nवित्तीय राहत और रोजगार सृजन',
    JSON_ARRAY(
        'Aadhaar Card',
        'Business Registration (for MSME)',
        'Bank Account Details'
    )
);

-- 7. CGTMSE (Credit Guarantee Scheme)
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)',
    'Ministry of MSME & SIDBI',
    'Credit guarantee cover up to ₹5 crore for collateral-free loans to MSEs.',
    'All new and existing Micro and Small Enterprises including service enterprises eligible for collateral-free credit from Member Lending Institutions.',
    'https://www.cgtmse.in/',
    NULL,
    NULL,
    JSON_ARRAY('Entrepreneur', 'Small Business Owner'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'MSEs के लिए बिना गारंटी लोन पर गारंटी कवर\n₹5 करोड़ तक के क्रेडिट पर सुरक्षा',
    JSON_ARRAY(
        'Business Registration Documents',
        'PAN Card',
        'Bank Account Details',
        'Loan Application'
    )
);

-- 8. Deendayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Deendayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)',
    'Ministry of Rural Development, Government of India',
    'Free skill training and job placement for rural youth aged 15-35 years.',
    'Rural youth from poor families (BPL, MGNREGA job card holders, Antyodaya households, etc.).',
    'https://ddugky.gov.in/',
    15,
    35,
    JSON_ARRAY('Rural Youth'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'ग्रामीण युवाओं के लिए मुफ्त स्किल ट्रेनिंग और नौकरी दिलाने की सुविधा\n15 से 35 साल के युवाओं के लिए',
    JSON_ARRAY(
        'Aadhaar Card',
        'Residence Proof',
        'Age Proof',
        'Income/BPL Certificate'
    )
);

-- 9. Janani Suraksha Yojana
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Janani Suraksha Yojana (JSY)',
    'Ministry of Health & Family Welfare, Government of India',
    'Cash assistance to promote institutional deliveries among BPL pregnant women.',
    'Pregnant women from BPL families, aged 19 years and above, giving birth in government health institutions or accredited private facilities.',
    'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309',
    19,
    49,
    JSON_ARRAY('Pregnant Woman'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    'Female',
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'संस्थानिक प्रसव पर नगद प्रोत्साहन\nBPL गर्भवती महिलाओं के लिए 19 वर्ष से ऊपर',
    JSON_ARRAY(
        'Aadhaar Card',
        'BPL Card',
        'Mother & Child Protection Card',
        'Bank Account Details'
    )
);

-- 10. National Horticulture Mission
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'National Horticulture Mission (NHM)',
    'Department of Agriculture & Farmers Welfare, Government of India',
    'Assistance for horticulture development, nurseries, drip irrigation, and post-harvest management.',
    'Farmers, entrepreneurs, SHGs, cooperatives engaged in horticulture development projects.',
    'https://nhb.gov.in/',
    NULL,
    NULL,
    JSON_ARRAY('Farmer', 'Entrepreneur', 'SHG Member'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'बागवानी विकास और ड्रिप सिंचाई के लिए वित्तीय सहायता\nपोस्ट हार्वेस्ट मैनेजमेंट में भी मदद',
    JSON_ARRAY(
        'Aadhaar Card',
        'Land Records',
        'Project Proposal',
        'Bank Account Details'
    )
);

-- 11. National Social Assistance Programme (NSAP)
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'National Social Assistance Programme (NSAP)',
    'Ministry of Rural Development, Government of India',
    'Social pension for elderly, widows, and disabled persons from BPL families.',
    'Senior citizens (60+), widows (40-79 years), and persons with disability (80%+) belonging to BPL households.',
    'https://nsap.nic.in/',
    NULL,
    NULL,
    JSON_ARRAY('Senior Citizen', 'Widow', 'Disabled Person'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'गरीब वृद्ध, विधवा और विकलांग व्यक्तियों को मासिक पेंशन\nराष्ट्रीय सामाजिक सहायता योजना के तहत',
    JSON_ARRAY(
        'Aadhaar Card',
        'BPL Card',
        'Age/Disability/Widowhood Proof',
        'Bank Account Details'
    )
);

-- 12. PM Kaushal Vikas Yojana (PMKVY)
INSERT INTO schemes (
    scheme_name,
    governing_body,
    benefit_highlight,
    eligibility_summary,
    full_details_link,
    target_age_min,
    target_age_max,
    target_occupations,
    target_states,
    target_income_max,
    target_gender,
    target_caste_category,
    display_summary,
    required_documents
) VALUES (
    'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
    'Ministry of Skill Development and Entrepreneurship, Government of India',
    'Free skill training and assessment with monetary rewards and certification.',
    'Unemployed youth and school/college dropouts seeking skill training for better employability.',
    'https://www.pmkvyofficial.org/',
    18,
    45,
    JSON_ARRAY('Unemployed Youth', 'School Dropout', 'College Dropout'),
    JSON_ARRAY('All States/UTs'),
    NULL,
    NULL,
    JSON_ARRAY('General', 'OBC', 'SC', 'ST', 'EWS'),
    'मुफ्त स्किल ट्रेनिंग और प्रमाणन\nरोजगार के अवसर बढ़ाने के लिए',
    JSON_ARRAY(
        'Aadhaar Card',
        'Age Proof',
        'Educational Qualification Proof',
        'Bank Account Details'
    )
);
-- 1) RoDTEP — Remission of Duties & Taxes on Exported Products
INSERT INTO schemes (
    scheme_name, governing_body, benefit_highlight, eligibility_summary, full_details_link,
    target_age_min, target_age_max, target_occupations, target_states, target_income_max,
    target_gender, target_caste_category, display_summary, required_documents
) VALUES (
    'RoDTEP (Remission of Duties and Taxes on Exported Products)',
    'Department of Commerce / Directorate General of Foreign Trade (DGFT)',
    'Refund (remission) of embedded duties & taxes on exported products to improve export competitiveness.',
    'Exporters of goods from India; administered via DGFT with rates defined per tariff lines. Operates as a rebate of embedded taxes not otherwise refunded.',
    'https://dgft.gov.in/CP/?opt=RoDTEP',
    NULL, NULL,
    JSON_ARRAY('Exporter', 'Manufacturer', 'Export-Oriented Unit'),
    JSON_ARRAY('All States/UTs'),
    NULL, NULL,
    JSON_ARRAY('General','OBC','SC','ST','EWS'),
    'निर्यात किए गए उत्पादों पर लगाए गए कुछ करों/शुल्कों की वापसी (रीमिशन)\nनिर्यात प्रतिस्पर्धा बढ़ाने के लिए।',
    JSON_ARRAY('IEC (Importer-Exporter Code)','Shipping Bills/Export Documents','Bank Details','GST/Customs Documents')
);

-- 2) Zero-rated exports / IGST refund (Bond / LUT / Refund of unutilised ITC)
INSERT INTO schemes (
    scheme_name, governing_body, benefit_highlight, eligibility_summary, full_details_link,
    target_age_min, target_age_max, target_occupations, target_states, target_income_max,
    target_gender, target_caste_category, display_summary, required_documents
) VALUES (
    'Zero-rated Exports (IGST refund / LUT / Refund of unutilised ITC)',
    'Central Board of Indirect Taxes & Customs (CBIC) / GST Council',
    'Exports treated as zero-rated supply — exporters can export under Bond/LUT without paying IGST and claim refund of unutilised Input Tax Credit, or pay IGST and claim refund.',
    'Registered GST persons exporting goods/services can choose Bond/LUT route to avoid paying IGST and claim refund of unutilised ITC, subject to conditions in IGST/CGST law.',
    'https://cbic-gst.gov.in/hindi/sectoral-faq.html',
    NULL, NULL,
    JSON_ARRAY('Exporter', 'Service Exporter'),
    JSON_ARRAY('All States/UTs'),
    NULL, NULL,
    JSON_ARRAY('General','OBC','SC','ST','EWS'),
    'निर्यात शून्य-रेटेड माना जाता है — बांड/LUT के जरिए IGST बिना भरे निर्यात और ITC की वापसी का दावा।',
    JSON_ARRAY('GST Registration','LUT/Bond (if applicable)','Shipping Bills','Invoices','Bank Details')
);

-- 3) Special Economic Zones (SEZ) — fiscal & procedural benefits for exporters
INSERT INTO schemes (
    scheme_name, governing_body, benefit_highlight, eligibility_summary, full_details_link,
    target_age_min, target_age_max, target_occupations, target_states, target_income_max,
    target_gender, target_caste_category, display_summary, required_documents
) VALUES (
    'Special Economic Zone (SEZ) Scheme',
    'Ministry of Commerce & Industry / SEZ Authority',
    'Fiscal exemptions and facilitation (customs duty exemption, zero-rated supplies, single-window clearances) for units in SEZs.',
    'Units established in notified SEZs engaged in manufacturing/services/processing for export; receive custom/GST/other tax exemptions and ease of doing business measures.',
    'https://sezindia.gov.in/facilities-and-incentives',
    NULL, NULL,
    JSON_ARRAY('SEZ Unit', 'Developer', 'Exporter'),
    JSON_ARRAY('All States/UTs with SEZs'),
    NULL, NULL,
    JSON_ARRAY('General','OBC','SC','ST','EWS'),
    'SEZ में स्थापित यूनिटों को कस्टम/GST छूट, शून्य-रेटेड सप्लाई और सिंगल-विंडो अनुमोदन।',
    JSON_ARRAY('SEZ Unit Approval Documents','Incorporation Docs','Customs/Import-Export Docs','Bank Details')
);

-- 4) EPCG — Export Promotion Capital Goods Scheme
INSERT INTO schemes (
    scheme_name, governing_body, benefit_highlight, eligibility_summary, full_details_link,
    target_age_min, target_age_max, target_occupations, target_states, target_income_max,
    target_gender, target_caste_category, display_summary, required_documents
) VALUES (
    'EPCG (Export Promotion Capital Goods) Scheme',
    'Directorate General of Foreign Trade (DGFT)',
    'Allows import of capital goods at concessional duty (or zero) for producing exports; requires domestic export obligation over a period.',
    'Exporters/importers can import capital goods for pre-production/production/post-production at concessional duty subject to export obligation (EO) commitments.',
    'https://www.dgft.gov.in/CP/?opt=epcg',
    NULL, NULL,
    JSON_ARRAY('Exporter Manufacturer','Industrial Unit'),
    JSON_ARRAY('All States/UTs'),
    NULL, NULL,
    JSON_ARRAY('General','OBC','SC','ST','EWS'),
    'निर्यात बढ़ाने के लिए पूंजीगत सामान (Capital Goods) कम/शुल्क-मुक्त आयात; एक्सपोर्ट ऑब्लिगेशन लगती है।',
    JSON_ARRAY('EPCG License/Authorization','Project/Investment Documents','Export Performance Documents','Bank Details')
);

-- 5) Duty Drawback (Customs & Excise rebates on exported goods)
INSERT INTO schemes (
    scheme_name, governing_body, benefit_highlight, eligibility_summary, full_details_link,
    target_age_min, target_age_max, target_occupations, target_states, target_income_max,
    target_gender, target_caste_category, display_summary, required_documents
) VALUES (
    'Duty Drawback Scheme',
    'Central Board of Indirect Taxes & Customs (CBIC)',
    'Refund (drawback) of customs and excise duties on inputs used in manufacture of exported goods to keep exports zero-rated.',
    'Exporters of goods who have paid customs/excise duties on inputs can claim duty drawback under specified All Industry/Brand rates or specific drawback schedules.',
    'https://www.cbic.gov.in/ (Duty Drawback pages / Drawback Schedule)',
    NULL, NULL,
    JSON_ARRAY('Exporter','Manufacturer'),
    JSON_ARRAY('All States/UTs'),
    NULL, NULL,
    JSON_ARRAY('General','OBC','SC','ST','EWS'),
    'निर्यातित माल पर उपयोग हुए इनपुट पर लगे कस्टम/एक्साइज़ करों की वापसी (ड्यूटी ड्रेबैक)।',
    JSON_ARRAY('Shipping Bill','Customs Documents','Invoices','Exporter Bank Details')
);

-- 6) Startup India (DPIIT recognition & benefits)
INSERT INTO schemes (
    scheme_name, governing_body, benefit_highlight, eligibility_summary, full_details_link,
    target_age_min, target_age_max, target_occupations, target_states, target_income_max,
    target_gender, target_caste_category, display_summary, required_documents
) VALUES (
    'Startup India (DPIIT Recognition & Incentives)',
    'Department for Promotion of Industry and Internal Trade (DPIIT) / Startup India',
    'DPIIT-recognition gives startups tax benefits, easier compliance, fast-track IPR, govt procurement preference & access to funding schemes/incubators.',
    'Eligible private limited / partnership companies meeting DPIIT definition (innovative, scalability, age limits) can apply for recognition and access benefits.',
    'https://www.startupindia.gov.in/',
    NULL, NULL,
    JSON_ARRAY('Startup','Founder','Entrepreneur'),
    JSON_ARRAY('All States/UTs'),
    NULL, NULL,
    JSON_ARRAY('General','OBC','SC','ST','EWS'),
    'DPIIT मान्यता से टैक्स/कानूनी छूट, IPR फ़ास्ट ट्रैक और सरकारी खरीद में प्रेफरेंस।',
    JSON_ARRAY('Company Incorporation Docs','Founders ID (Aadhaar/PAN)','Business Plan','Board Resolution')
);

-- 7) Udyam Registration (MSME benefits)
INSERT INTO schemes (
    scheme_name, governing_body, benefit_highlight, eligibility_summary, full_details_link,
    target_age_min, target_age_max, target_occupations, target_states, target_income_max,
    target_gender, target_caste_category, display_summary, required_documents
) VALUES (
    'Udyam Registration (MSME) Benefits',
    'Ministry of Micro, Small & Medium Enterprises (MSME)',
    'Udyam registration gives MSMEs easier access to credit, subsidies, government tenders, schemes and priority support (collateral-free loans, concessions, tender preference).',
    'Micro/Small/Medium enterprises (manufacturing/services) can register online at Udyam portal to avail various MSME benefits and schemes.',
    'https://udyamregistration.gov.in/ (Official Udyam portal / msme.gov.in)',
    NULL, NULL,
    JSON_ARRAY('MSME','Small Entrepreneur','Self-Help Group'),
    JSON_ARRAY('All States/UTs'),
    NULL, NULL,
    JSON_ARRAY('General','OBC','SC','ST','EWS'),
    'Udyam पंजीकरण से MSME को बैंक ऋण, सब्सिडी, सरकारी टेंडर और अन्य सहूलियतें मिलती हैं।',
    JSON_ARRAY('PAN Card','Aadhaar Card','Business Details','Bank Account Details')
);

-- 8) Interest Equalisation Scheme (IES) for Export Credit (subvention)
INSERT INTO schemes (
    scheme_name, governing_body, benefit_highlight, eligibility_summary, full_details_link,
    target_age_min, target_age_max, target_occupations, target_states, target_income_max,
    target_gender, target_caste_category, display_summary, required_documents
) VALUES (
    'Interest Equalisation Scheme (IES) for Export Credit',
    'Directorate General of Foreign Trade (DGFT) / Ministry of Commerce & Industry',
    'Interest subsidy/equalisation on pre- and post-shipment rupee export credit for eligible exporters (reduces cost of borrowing for exporters/MSMEs).',
    'Eligible exporters (MSME manufacturer exporters and certain notified sectors) can get interest equalisation/subvention via banks after applying through DGFT module and obtaining UIN.',
    'https://content.dgft.gov.in/Website/EPS.pdf',
    NULL, NULL,
    JSON_ARRAY('Exporter','MSME Exporter'),
    JSON_ARRAY('All States/UTs'),
    NULL, NULL,
    JSON_ARRAY('General','OBC','SC','ST','EWS'),
    'निर्यात क्रेडिट पर ब्याज सब्सिडी/इक्वलाइज़ेशन — MSME निर्यातकों के लिए ऋण लागत घटती है।',
    JSON_ARRAY('DGFT UIN (Unique IES ID)','Bank Loan Documents','Export Invoices','IEC Code')
);

-- 9) Pradhan Mantri Awas Yojana (PMAY-U / PMAY-G) — Affordable Housing
INSERT INTO schemes (
    scheme_name, governing_body, benefit_highlight, eligibility_summary, full_details_link,
    target_age_min, target_age_max, target_occupations, target_states, target_income_max,
    target_gender, target_caste_category, display_summary, required_documents
) VALUES (
    'Pradhan Mantri Awas Yojana (PMAY) - Urban & Gramin',
    'Ministry of Housing & Urban Affairs (PMAY-U) / Ministry of Rural Development (PMAY-G)',
    'Subsidies & grants for construction/purchase of affordable pucca houses for EWS/LIG/MIG categories (varies by component).',
    'Eligible EWS/LIG/MIG families without pucca houses; details vary by PMAY-U and PMAY-G verticals (BLC, AHP, CLSS).',
    'https://pmay-urban.gov.in/ (PMAY-U official portal)',
    NULL, NULL,
    JSON_ARRAY('EWS Household','Rural Poor Household'),
    JSON_ARRAY('All States/UTs'),
    NULL, NULL,
    JSON_ARRAY('General','OBC','SC','ST','EWS'),
    'आवास के लिए सब्सिडी/वित्तीय सहायता — EWS/LIG/MIG परिवारों के लिए पक्का घर उपलब्ध कराना।',
    JSON_ARRAY('Aadhaar Card','Income/Eligibility Proof','Residence Proof','Bank Account Details')
);

-- 10) Kisan Credit Card (KCC) — agricultural credit & subvention
INSERT INTO schemes (
    scheme_name, governing_body, benefit_highlight, eligibility_summary, full_details_link,
    target_age_min, target_age_max, target_occupations, target_states, target_income_max,
    target_gender, target_caste_category, display_summary, required_documents
) VALUES (
    'Kisan Credit Card (KCC)',
    'Reserve Bank of India / NABARD / Commercial Banks',
    'Affordable, timely short-term & term credit for farmers (crop production, post-harvest, allied activities) with interest subvention options in some periods and insurance cover.',
    'All farmers (small & marginal, tenant farmers where permitted) can apply for KCC via banks; features include crop loans, working capital, and in some years interest subvention schemes.',
    'https://www.rbi.org.in/commonman/english/scripts/Notification.aspx?Id=2311',
    NULL, NULL,
    JSON_ARRAY('Farmer','Marginal Farmer','Tenant Farmer'),
    JSON_ARRAY('All States/UTs'),
    NULL, NULL,
    JSON_ARRAY('General','OBC','SC','ST','EWS'),
    'कृषि के लिए सुलभ ऋण (फसल, पोस्ट-हार्वेस्ट, घर खर्च) — समय पर क्रेडिट और कुछ बार ब्याज सब्सिडी।',
    JSON_ARRAY('KCC Application Form','Aadhaar Card','Land Documents (if any)','Bank Account Details')
);
















