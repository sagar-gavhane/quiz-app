import request from "supertest"
import app from "../../../app"
import db from "./../../../db"
import { describe, it, expect, beforeEach } from "@jest/globals"
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status"

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
    const response = await request(app).get("/api/quiz/10000")

    expect(response.status).toBe(OK)
    expect(response.body).toEqual({ quiz: {} })
  })

  it("should throw error if invalid quiz id passed", async () => {
    const response = await request(app).get("/api/quiz/invalid-quiz-id")

    expect(response.status).toBe(BAD_REQUEST)
    expect(response.body).toEqual({ message: "Bad Request" })
  })

  it("should return an quiz", async () => {
    const response = await request(app).get("/api/quiz/1")
    const { quiz } = response.body

    expect(quiz).toMatchObject({
      id: expect.any(Number),
      title: expect.any(String),
    })
  })
})
