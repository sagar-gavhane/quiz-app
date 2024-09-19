import { Request, Response } from "express"
import { BAD_REQUEST, CREATED, OK } from "http-status"
import Quiz from "./../entity/Quiz"
import db from "./../db"
import Question from "../entity/Question"
import QuestionOption from "../entity/QuestionOption"
import Answer from "../entity/Answers"

// Get all quiz data
export const getQuizzes = (req: Request, res: Response) => {
  const quizzes = db.getQuiz.map((quiz) => db.getQuizWithQuestionsById(quiz.id))
  res.status(OK).send(quizzes)
}

// Get quiz by id
export const getQuizById = async (req: Request, res: Response) => {
  const quizId = +req.params.quizId

  // Validate if quizId is a valid number
  if (isNaN(quizId)) {
    res.status(BAD_REQUEST).json({ message: "Bad Request" })
    return
  }

  const quiz = db.getQuizWithQuestionsById(quizId)
  res.status(OK).json({ quiz })
}

// Create quiz
export const createQuiz = (req: Request, res: Response) => {
  const nextQuizId = db.getNextQuizId()
  const nextQuestionId = db.getNextQuestionId()
  const nextQuestionOptionId = db.getNextQuestionOptionId()

  const quiz = new Quiz(nextQuizId, req.body.quiz.title)
  const questions: Question[] = []
  const questionOptions: QuestionOption[] = []

  req.body.quiz.questions.forEach((question: Question, qId: number) => {
    const newQuestion = new Question(
      nextQuestionId + qId,
      question.text,
      question.correctOption,
      nextQuizId
    )

    question.questionOptions.forEach((option: QuestionOption, qoId: number) => {
      const questionOption = new QuestionOption(
        nextQuestionOptionId + qoId,
        option.text,
        nextQuestionId + qId
      )

      // Set the correct option for the question
      if (newQuestion.correctOption === qoId) {
        newQuestion.setCorrectOption = questionOption.getQuestionOptionId
      }

      questionOptions.push(questionOption)
    })

    questions.push(newQuestion)
  })

  db.addQuiz(quiz)
  db.addQuestions(questions)
  db.addQuestionOptions(questionOptions)

  const result = db.getQuizWithQuestionsById(nextQuizId)
  res.status(CREATED).json({ quiz: result })
}

// Submit answer
export const submitAnswer = async (req: Request, res: Response) => {
  const quizId = +req.body.quizId
  const quiz = db.getQuiz.find((quiz) => quiz.id === quizId)

  if (!quiz) {
    res.status(BAD_REQUEST).json({ message: "Quiz not exist." })
    return
  }

  const question = db.questions.find(
    (question) => question.questionId === +req.body.questionId
  )

  if (!question) {
    res.status(BAD_REQUEST).json({ message: "Question not exist in quiz." })
    return
  }

  // Check if the user has already submitted an answer for this question
  const alreadySubmittedExist = db.answers.find(
    (answer) =>
      answer.userId === +req.body.userId &&
      answer.questionId === +req.body.questionId
  )

  if (alreadySubmittedExist) {
    res.status(OK).json({ message: "Answer already submitted." })
    return
  }

  const isCorrect = question.correctOption === +req.body.correctOption

  const answer = new Answer(
    db.getNextAnswerId(),
    +req.body.questionId,
    +req.body.correctOption,
    isCorrect,
    +req.body.userId
  )

  db.addAnswer(answer)

  if (!isCorrect) {
    res.status(OK).json({ message: "Sorry! You got it wrong." })
    return
  }

  res.status(OK).json({ message: "Congrats! You got it right." })
}

// Get user's score by quizId
export const getUserScoreByQuizId = (req: Request, res: Response) => {
  const quizId = +req.params.quizId
  const userId = +req.params.userId
  const user = db.users.find((user) => user.userId === userId)

  if (!user) {
    res.status(BAD_REQUEST).json({ message: "User not exist." })
    return
  }

  const quiz = db.getQuiz.find((quiz) => quiz.id === quizId)

  if (!quiz) {
    res.status(BAD_REQUEST).json({ message: "Quiz not exist." })
    return
  }

  const totalAnsweredQuestion = db.answers.filter(
    (answer) => answer.userId === userId
  ).length
  const totalCorrectAnswer = db.answers.filter(
    (answer) => answer.userId === userId && answer.isCorrect
  ).length

  // Calculate score percentage and create answer summary
  const result = {
    userId,
    name: user.name,
    quizId,
    title: quiz.title,
    totalAnswers: totalAnsweredQuestion,
    correctAnswers: totalCorrectAnswer,
    answerSummary: db.answers
      .filter((answer) => answer.userId === userId)
      .map((answer) => ({
        questionId: answer.questionId,
        text: db.questions.find(
          (question) => question.questionId === answer.questionId
        )?.text,
        selectedOption: answer.selectedOption,
        isCorrect: answer.isCorrect,
      })),
    scorePercentage: Math.round(
      (totalCorrectAnswer / totalAnsweredQuestion) * 100
    ),
  }

  res.status(OK).json(result)
}
