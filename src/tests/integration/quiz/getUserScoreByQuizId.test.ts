import request from "supertest"
import app from "../../../app"
import db from "./../../../db"
import { describe, it, expect, beforeEach } from "@jest/globals"
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status"

describe("GET /api/quiz/:quizId/:userId/score", () => {
  beforeEach(async () => {
    db.clear()

    const payload = {
      quiz: {
        title: "Quiz on CS",
        questions: [
          {
            text: "Which among the following is not a computer language?",
            correctOption: 1,
            questionOptions: [
              {
                text: "ALGOL",
              },
              {
                text: "DRAM",
              },
              {
                text: "C++",
              },
              {
                text: "PASCAL",
              },
            ],
          },
          {
            text: "Which of the following is an output device?",
            correctOption: 2,
            questionOptions: [
              {
                text: "Keyboard",
              },
              {
                text: "Joy Stick",
              },
              {
                text: "Printer",
              },
              {
                text: "None of the above",
              },
            ],
          },
          {
            text: "Which of the following is used to store data in a computer?",
            correctOption: 0,
            questionOptions: [
              {
                text: "Hard Disks",
              },
              {
                text: "CPU",
              },
              {
                text: "Monitor",
              },
              {
                text: "None of the above",
              },
            ],
          },
        ],
      },
    }

    await request(app).post("/api/quiz").send(payload)
    await request(app)
      .post("/api/user")
      .send({ name: "User 1", email: "user-1@domain.com" })
  })

  it("should return error if non existing user id passed", async () => {
    const response = await request(app).get("/api/quiz/100000/-1/score")

    expect(response.status).toBe(BAD_REQUEST)
    expect(response.body).toEqual({ message: "User not exist." })
  })

  it("should return error if non existing quiz id passed", async () => {
    const response = await request(app).get("/api/quiz/-1/100000/score")

    expect(response.status).toBe(BAD_REQUEST)
    expect(response.body).toEqual({ message: "Quiz not exist." })
  })

  it("should return user score", async () => {
    await request(app).post("/api/quiz/submit-answer").send({
      questionId: 100,
      correctOption: 1001,
      quizId: 1,
      userId: 100000,
    })
    await request(app).post("/api/quiz/submit-answer").send({
      questionId: 101,
      correctOption: 1001,
      quizId: 1,
      userId: 100000,
    })
    await request(app).post("/api/quiz/submit-answer").send({
      questionId: 102,
      correctOption: 1002,
      quizId: 1,
      userId: 100000,
    })

    const response = await request(app).get("/api/quiz/1/100000/score")

    expect(response.status).toBe(OK)
    expect(response.body).toEqual({
      userId: 100000,
      name: "User 1",
      quizId: 1,
      title: "Quiz on CS",
      totalAnswers: 3,
      correctAnswers: 1,
      scorePercentage: 33,
      answerSummary: [
        {
          questionId: 100,
          text: "Which among the following is not a computer language?",
          selectedOption: 1001,
          isCorrect: true,
        },
        {
          isCorrect: false,
          questionId: 101,
          selectedOption: 1001,
          text: "Which of the following is an output device?",
        },
        {
          isCorrect: false,
          questionId: 102,
          selectedOption: 1002,
          text: "Which of the following is used to store data in a computer?",
        },
      ],
    })
  })
})
