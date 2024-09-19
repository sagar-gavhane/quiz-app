import QuestionOption from "./QuestionOption"

export default class Question {
  questionId: number
  text: string
  correctOption: number
  quizId: number
  questionOptions: QuestionOption[] = []

  constructor(
    questionId: number,
    text: string,
    correctOption: number,
    quizId: number
  ) {
    this.questionId = questionId
    this.text = text
    this.correctOption = correctOption
    this.quizId = quizId
  }

  set setCorrectOption(id: number) {
    this.correctOption = id
  }
}
