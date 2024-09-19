import request from "supertest"
import app from "../../../app"
import db from "./../../../db"
import { describe, it, expect, beforeEach } from "@jest/globals"
import { OK } from "http-status"

describe("GET /api/quiz", () => {
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

  it("should return an empty array if no quiz found", async () => {
    const response = await request(app).get("/api/quiz")
    expect(response.status).toBe(OK)
    expect(response.body).toMatchObject(expect.any(Array))
  })

  it("should return an quiz", async () => {
    const response = await request(app).get("/api/quiz")
    const quizzes = response.body

    quizzes.forEach((quiz: any) => {
      expect(quiz).toMatchObject({
        id: expect.any(Number),
        title: expect.any(String),
      })
    })
  })
})
