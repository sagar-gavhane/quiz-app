import Sequence from "./entity/Sequence"
import QuestionOption from "./entity/QuestionOption"
import Question from "./entity/Question"
import Quiz from "./entity/Quiz"
import Answer from "./entity/Answers"
import User from "./entity/User"

class DB {
  quiz: Quiz[]
  questions: Question[]
  questionOptions: QuestionOption[]
  answers: Answer[]
  users: User[]
  sequence: Sequence

  constructor() {
    this.quiz = []
    this.questions = []
    this.questionOptions = []
    this.answers = []
    this.users = []
    this.sequence = new Sequence()
  }

  get getQuiz() {
    return this.quiz
  }

  getQuizWithQuestionsById(quizId: number, showCorrectOption = false) {
    const quiz = this.quiz.find((quiz) => quiz.id === quizId)

    if (!quiz) {
      return {}
    }

    const questions = this.questions

    const result = {
      ...quiz,
      questions: questions
        .filter((question) => question.quizId === quizId)
        .map((question) => {
          const questionOptions = this.questionOptions.filter(
            (questionOption) =>
              questionOption.questionId === question.questionId
          )

          return {
            ...question,
            ...{
              correctOption: showCorrectOption ? question.correctOption : null,
            },
            questionOptions,
          }
        }),
    }

    return result
  }

  getNextQuizId() {
    return this.sequence.quiz
  }

  getNextQuestionId() {
    return this.sequence.question
  }

  getNextQuestionOptionId() {
    return this.sequence.questionOption
  }

  getNextAnswerId() {
    return this.sequence.answer
  }

  getNextUserId() {
    return this.sequence.user
  }

  clear() {
    this.quiz = []
    this.questions = []
    this.questionOptions = []
    this.answers = []
    this.users = []
    this.sequence = new Sequence()
  }

  addQuiz(quiz: Quiz) {
    this.quiz.push(quiz)
    this.sequence.quiz += 1
  }

  addQuestions(questions: Question[]) {
    this.questions.push(...questions)
    this.sequence.question += questions.length
  }

  addQuestionOptions(questionOptions: QuestionOption[]) {
    this.questionOptions.push(...questionOptions)
    this.sequence.questionOption += questionOptions.length
  }

  addAnswer(answer: Answer) {
    this.answers.push(answer)
    this.sequence.answer += 1
  }

  addUser(user: User) {
    this.users.push(user)
    this.sequence.user += 1
  }
}

export default new DB()
