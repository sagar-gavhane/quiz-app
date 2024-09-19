export interface IQuestionOption {
  id: number
  text: string
}

export interface IQuestion {
  id: number
  text: string
  options: IQuestionOption[]
  correct_option: number
}

export interface IQuiz {
  id: number
  title: string
  questions: IQuestion[]
}

export interface IAnswer {
  question_id: number
  selected_option: number
  is_correct: boolean
}

export interface IResult {
  id: number
  quiz_id: number
  user_id: number
  score: number
  answers: IAnswer[]
}

export interface ISequence {
  quiz: number
  question: number
  questionOption: number
}
