// question.controller.js
const {askQuestion, getAllQuestions, } = require('./question.service');

const questionController = {
 askQuestions: (req, res) => {
    const {question, description, codeBlock, tags,userId } = req.body;

    askQuestion(question, description, codeBlock, tags,userId)
      .then((insertedQuestion) => {
        // Question successfully inserted
        res.status(201).json(insertedQuestion);
      })
      .catch((error) => {
        console.error('Error asking question:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  },
  getQuestions: (req, res) => {
        getAllQuestions((err, results) => {
            if (err) {
                console.log(err);
                return res.status(200).json({msg:"database connection error"})
            }
            return res.status(200).json({data:results})
        })
    }
};

module.exports = questionController;
