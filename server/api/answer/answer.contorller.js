const { answerQuestion, getAllanswers } = require('./answer.service')
const answerController = {
    answerQ: (req, res) => {
        const {answer, answer_code_block, user_id, question_id } = req.body
        answerQuestion(answer, answer_code_block, user_id, question_id).then((insertedAnswer) => {
                res.status(201).json(insertedAnswer)
            }).catch((error) => {
                console.error("error getting answer", error)
                res.status(500).json({ error: "inte server error" })
            })
    },
    getAnswer: (req, res) => {
        getAllanswers((err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({msg:'database connection error'})
            }
            return res.status(200).json({data:results})
        })
    }
}
module.exports=answerController