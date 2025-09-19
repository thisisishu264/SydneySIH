const db = require('./db');

// Helper function to calculate age from Date of Birth
function calculateAge(dob) {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

async function getEligibleSchemes(userId) {
    const [userRows] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    if (userRows.length === 0) {
        throw new Error('User not found');
    }
    const user = userRows[0];
    const userAge = calculateAge(user.dob);

    const [allSchemes] = await db.query('SELECT * FROM schemes');

    const eligibleSchemes = allSchemes.filter(scheme => {
        const isAgeEligible = (scheme.target_age_min === null || userAge >= scheme.target_age_min) && (scheme.target_age_max === null || userAge <= scheme.target_age_max);
        const isIncomeEligible = scheme.target_income_max === null || user.annual_income <= scheme.target_income_max;
        const isGenderEligible = scheme.target_gender === null || user.gender.toLowerCase() === scheme.target_gender.toLowerCase();

        // No longer using JSON.parse()
        const isCasteEligible = scheme.target_caste_category === null || scheme.target_caste_category.includes("General") || scheme.target_caste_category.includes(user.caste_category);
        const isStateEligible = scheme.target_states === null || scheme.target_states.includes("All States/UTs") || scheme.target_states.includes(user.state);
        const isOccupationEligible = scheme.target_occupations === null || scheme.target_occupations.includes("Any Citizen") || scheme.target_occupations.includes(user.occupation);

        return isAgeEligible && isIncomeEligible && isGenderEligible && isCasteEligible && isStateEligible && isOccupationEligible;
    });

    return eligibleSchemes;
}

module.exports = { getEligibleSchemes };