# Reference

## Project structure

```
efficience-it.github.io/
  index.html                  Home page — topic selection, quiz history
  quizz_docker.html           Quiz page — questions, progress, validation
  assets/js/
    common.js                 Shared utilities (query params, restart)
    topics.js                 Topic definitions and YAML file paths
    quiz-ui.js                DOM rendering, HTML generation, progress tracking
    quizz_docker.js           Data fetching, answer validation, history, init
    gtag.js                   Google Analytics (privacy mode)
  docs/                       Project documentation
```

## JavaScript files

### `common.js`

| Function | Description |
|----------|-------------|
| `getQueryParam(param)` | Returns the value of a URL search parameter |
| Restart listener | Reloads the page, preserving the `?topic=` param if present |

### `topics.js`

Exports a single `quizTopics` object. Each key is a topic slug (used in `?topic=` param), each value has:

| Property | Type | Description |
|----------|------|-------------|
| `title` | string | Display title shown in the quiz header |
| `yamlFiles` | string[] | Paths to YAML files relative to the docker-practice repo root |

### `quiz-ui.js`

| Function | Description |
|----------|-------------|
| `escapeHTML(text)` | Escapes HTML special characters to prevent XSS |
| `updatePageTitles(title)` | Sets both the `<title>` and the visible `<h1>` |
| `displayError(message)` | Shows an error message with a reload button |
| `generateQuestionHTML(question, index)` | Returns the HTML string for a single question block |
| `displayQuestions(questions)` | Renders all questions, sets up progress tracking, UUID copy, and form submission |

### `quizz_docker.js`

| Function | Description |
|----------|-------------|
| `shuffleArray(array)` | Fisher-Yates in-place shuffle |
| `fetchQuestionsFromTopics(topics, questionsPerTopic?)` | Fetches and aggregates questions from one or more topics |
| `fetchYamlFiles(topic)` | Entry point for single-topic quizzes |
| `fetchGeneralQuiz()` | Entry point for general training (balanced across all topics) |
| `fetchYaml(url)` | Fetches and parses a single YAML file, with sessionStorage cache |
| `checkResponses()` | Validates answers, updates UI, saves result to history |
| `saveQuizResult(score, total, category)` | Appends a result to `localStorage` (max 10 entries) |

## localStorage keys

| Key | Format | Description |
|-----|--------|-------------|
| `quizHistory` | JSON array of `{ date, category, score, total }` | Last 10 quiz results, displayed on home page |
| `theme` | `"dark"` or `"light"` | User dark mode preference |

## sessionStorage keys

| Key pattern | Format | Description |
|-------------|--------|-------------|
| `yamlCache:<url>` | JSON array of question objects | Cached parsed YAML to avoid re-fetching within a session |

## Question YAML format

Questions are hosted in [efficience-it/docker-practice](https://github.com/efficience-it/docker-practice) (branch `v1.5`).

```yaml
questions:
  - question: "Question text"
    answers:
      - value: "Answer text"
        correct: true
      - value: "Wrong answer"
        correct: false
    uuid: "unique-identifier"
    help: "https://link-to-documentation"
```

- If multiple answers have `correct: true`, the question renders as checkboxes; otherwise radio buttons.
- `uuid` is used for the copy-to-clipboard feature (for reporting issues).
- `help` is the link shown after validation.

## External dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.16 (CDN) | Utility-first CSS framework |
| [js-yaml](https://github.com/nodeca/js-yaml) | 4.1.0 (CDN) | YAML parsing in the browser |
| [Inter](https://rsms.me/inter/) | latest (Google Fonts) | UI typeface |
