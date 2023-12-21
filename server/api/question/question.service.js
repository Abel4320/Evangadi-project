// question.service.js
const pool = require('../../config/database');

module.exports = {
 askQuestion : ( question, description, codeBlock, tags,userId,) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO question (question, question_description, question_code_block, tags, user_id) VALUES (?, ?, ?, ?, ?)';
    pool.query(sql, [question, description, codeBlock, tags, userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const insertedQuestion = {
          questionId: results.insertId,
          question,
          description,
          codeBlock,
          tags,
          userId
        };
        resolve(insertedQuestion);
      }
    });
  });
},
  getAllQuestions: (callback) => {
        pool.query(
            `SELECT question,question_id,question_description,tags,user_id FROM question`, [],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        );
    },
};
  
