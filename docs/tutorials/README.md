# Getting started

## Prerequisites

- A modern web browser
- A local HTTP server (e.g. `python -m http.server`, VS Code Live Server, or `npx serve`)

Git is only needed if you want to contribute.

## Run the app locally

```bash
git clone git@github.com:efficience-it/efficience-it.github.io.git
cd efficience-it.github.io
python -m http.server 8000
```

Open `http://localhost:8000` in your browser. The home page lists all available quiz categories.

## Take a quiz

1. Click **General Training** for a mixed quiz (20 questions across all topics), or pick a specific topic card.
2. Answer each question by selecting one or more options.
3. The progress bar at the top tracks how many questions you've answered.
4. Click **Validate** to submit. Correct answers appear in green, incorrect in red, with a link to the source documentation.
5. Your score is saved automatically to `localStorage` and appears on the home page under **Recent activity**.
6. Click **Restart** to get a new random set of questions.

## Add a new question

Questions live in the separate [docker-practice](https://github.com/efficience-it/docker-practice) repository as YAML files. Each file contains one or more questions:

```yaml
questions:
  - question: "What command lists running containers?"
    answers:
      - value: "docker ps"
        correct: true
      - value: "docker list"
        correct: false
      - value: "docker containers"
        correct: false
    uuid: "a1b2c3d4-..."
    help: "https://docs.docker.com/reference/cli/docker/container/ls/"
```

Submit a PR to that repository. Once merged to the `v1.5` branch, questions are automatically available in the quiz app.
