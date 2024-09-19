import request from "supertest"
import app from "../../../app"
import db from "./../../../db"
import { describe, it, expect, beforeEach } from "@jest/globals"
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status"

describe("POST /api/quiz/submit-answer", () => {
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
        ],
      },
    }

    await request(app).post("/api/quiz").send(payload)
    await request(app).post("/api/quiz").send(payload)
  })

  it("should return error if quiz not exist", async () => {
    const payload = {
      question_id: 1,
      correct_option: 1,
      quiz_id: 1000,
      user_id: 1,
    }

    const response = await request(app)
      .post("/api/quiz/submit-answer")
      .send(payload)

    expect(response.status).toBe(BAD_REQUEST)
    expect(response.body.message).toBe("Quiz not exist.")
  })

  it("should return error if question not exist in quiz", async () => {
    const payload = {
      questionId: 1,
      correctOption: 1,
      quizId: 1,
      userId: 1,
    }

    const response = await request(app)
      .post("/api/quiz/submit-answer")
      .send(payload)

    expect(response.status).toBe(BAD_REQUEST)
    expect(response.body.message).toBe("Question not exist in quiz.")
  })

  it("should return error if question is already submitted", async () => {
    const payload = {
      questionId: 100,
      correctOption: 1,
      quizId: 1,
      userId: 1,
    }

    await request(app).post("/api/quiz/submit-answer").send(payload)
    const response = await request(app)
      .post("/api/quiz/submit-answer")
      .send(payload)

    expect(response.status).toBe(OK)
    expect(response.body.message).toBe("Answer already submitted.")
  })

  it("should return congratulation message if answer is correct", async () => {
    const payload = {
      questionId: 100,
      correctOption: 1001,
      quizId: 1,
      userId: 1,
    }

    const response = await request(app)
      .post("/api/quiz/submit-answer")
      .send(payload)

    expect(response.status).toBe(OK)
    expect(response.body.message).toBe("Congrats! You got it right.")
  })
})
