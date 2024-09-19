export default class QuestionOption {
  questionOptionId: number
  text: string
  questionId: number

  constructor(questionOptionId: number, text: string, questionId: number) {
    this.questionOptionId = questionOptionId
    this.text = text
    this.questionId = questionId
  }

  get getQuestionOptionId() {
    return this.questionOptionId
  }
}
