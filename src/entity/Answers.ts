export default class Answer {
  answerId: number
  questionId: number
  selectedOption: number
  isCorrect: boolean
  userId: number

  constructor(
    answerId: number,
    questionId: number,
    selectedOption: number,
    isCorrect: boolean,
    userId: number
  ) {
    this.answerId = answerId
    this.questionId = questionId
    this.selectedOption = selectedOption
    this.isCorrect = isCorrect
    this.userId = userId
  }
}
