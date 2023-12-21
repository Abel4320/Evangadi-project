const { useCallback } = require('react');
const pool = require('../../config/database');

module.exports = {
    answerQuestion: (answer, answer_code_block, user_id, question_id) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO answer (answer, answer_code_block, user_id,question_id) VALUES (?, ?, ?, ?)';
            pool.query(sql, [answer, answer_code_block, user_id, question_id], (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    const insertedAnswer = {
                        answer_id:results.insertId,
                        answer,
                        answer_code_block,
                        user_id,
                        question_id
                    }
                    resolve(insertedAnswer)
                }
            })
        })
    },
    getAllanswers: (callback) => {
        pool.query(`SELECT answer_id, answer, answer_code_block, user_id, question_id FROM answer`, [], (err, result) => {
            if (err) {
                return callback(err)
            }
            return callback(null, result)
        }
        )
    }
}