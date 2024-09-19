import request from "supertest"
import { CREATED } from "http-status"
import app from "../../../app"
import db from "./../../../db"
import { describe, expect, it, beforeEach } from "@jest/globals"

beforeEach(() => {
  db.clear()
})

describe("POST /api/quiz", () => {
  it("should create new quiz and return it as response", async () => {
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

    const response = await request(app).post("/api/quiz").send(payload)

    expect(response.status).toBe(CREATED)
    expect(response.body.quiz).toBeTruthy()
    expect(response.body.quiz).toMatchObject({
      id: expect.any(Number),
      title: payload.quiz.title,
    })

    expect(response.body.quiz.questions).toHaveLength(1)
    expect(response.body.quiz.questions).toMatchObject([
      {
        questionId: expect.any(Number),
        quizId: expect.any(Number),
        correctOption: null,
        text: expect.any(String),
        questionOptions: expect.any(Array),
      },
    ])
  })
})
