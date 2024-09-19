import request from "supertest"
import app from "../../app"
import { equal } from "assert"

describe("GET /health", () => {
  it("should return OK if server is up", async () => {
    const response = await request(app).get("/health")
    equal(response.status, 200)
    equal(response.text, "OK")
  })
})
