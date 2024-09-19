import { Request, Response } from "express"
import db from "./../db"
import User from "../entity/User"
import { CREATED } from "http-status"

export const createUser = (req: Request, res: Response) => {
  const nextUserId = db.getNextUserId()
  const user = new User(nextUserId, req.body.name, req.body.email)

  db.addUser(user)

  res.status(CREATED).send(user)
}
