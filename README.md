# Quiz App

This project is a backend service built using TypeScript, Node.js, and Express.js for a quiz application. It allows users to create, fetch, and submit answers to quizzes and receive feedback.

## Features

- **Create Quiz**: API to create a new quiz with a set of multiple-choice questions.
- **Fetch Quiz**: API to retrieve quiz details without revealing the correct answers.
- **Submit Answers**: API to submit an answer and receive feedback on correctness.
- **Get Results**: API to fetch the user's results for a specific quiz.
- **Testing**: Unit and integration tests are implemented using Jest.

## Table of Contents

- [Quiz App](#quiz-app)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Technologies](#technologies)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Testing](#testing)
  - [Test Coverage](#test-coverage)

## Technologies

- **Node.js** - Backend runtime environment.
- **Express.js** - Web framework for building RESTful APIs.
- **TypeScript** - Superset of JavaScript used for static type checking.
- **Jest** - Testing framework for unit and integration tests.

## Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (v14 or higher)
- **npm** or **yarn** (package manager)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/sagar-gavhane/quiz-api.git
   cd quiz-api
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

3. Run the development server:

   ```bash
   yarn run dev
   ```

   The server will start on `http://localhost:3000`.

4. Run the production server:

   ```bash
   npm run start
   ```

## Testing

To run the test suite using Jest:

```bash
yarn run test
```

```bash
yarn run test:watch
```

This will run all unit and integration tests to ensure the application is functioning as expected.

## Test Coverage

To check the code coverage of the tests:

```bash
yarn run test:coverage
```

This will generate a coverage report showing the percentage of code covered by tests.
