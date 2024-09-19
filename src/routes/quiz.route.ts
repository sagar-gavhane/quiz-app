import express from "express"
import {
  getQuizzes,
  createQuiz,
  getQuizById,
  submitAnswer,
  getUserScoreByQuizId,
} from "../controllers/quiz.controller"

const router = express.Router()

// Define routes for quiz-related endpoints

router.get("/", getQuizzes)
router.post("/submit-answer", submitAnswer)
router.get("/:quizId", getQuizById)
router.get("/:quizId/:userId/score", getUserScoreByQuizId)
router.post("/", createQuiz)

export default router
