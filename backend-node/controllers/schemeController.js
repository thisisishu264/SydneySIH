const db = require('../db');
const { getEligibleSchemes } = require('../eligibilityEngine');

exports.getEligibleSchemesForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const eligibleSchemes = await getEligibleSchemes(userId);
        res.json(eligibleSchemes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSchemeById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM schemes WHERE scheme_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Scheme not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};