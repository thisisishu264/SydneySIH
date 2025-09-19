const db = require('../db');

exports.createApplication = async (req, res) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const { userId, schemeId } = req.body;

        // Use a valid ENUM value 'Pending' for the status
        const appSql = 'INSERT INTO applications (user_id, scheme_id, status) VALUES (?, ?, ?)';
        const [appResult] = await connection.query(appSql, [userId, schemeId, 'Pending']);
        const newApplicationId = appResult.insertId;

        // Also use the valid ENUM value 'Pending' for the log
        const logSql = 'INSERT INTO application_status_log (application_id, status, comment) VALUES (?, ?, ?)';
        await connection.query(logSql, [newApplicationId, 'Pending', 'Application received and is pending review.']);

        await connection.commit();

        res.status(201).json({ applicationId: newApplicationId, status: 'Pending' });

    } catch (err) {
        await connection.rollback();
        console.error("Error creating application:", err.message);
        res.status(500).json({ error: 'Failed to create application.' });
    } finally {
        connection.release();
    }
};
exports.getUserApplications = async (req, res) => {
    try {
        const { userId } = req.params;
        const sql = `
            SELECT a.application_id, a.status, a.submitted_at, s.scheme_name 
            FROM applications a
            JOIN schemes s ON a.scheme_id = s.scheme_id
            WHERE a.user_id = ?
            ORDER BY a.submitted_at DESC
        `;
        const [applications] = await db.query(sql, [userId]);
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};