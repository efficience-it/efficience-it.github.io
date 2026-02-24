const MAX_QUESTIONS = 20;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function fetchQuestionsFromTopics(topics, questionsPerTopic = null) {
  const baseUrl =
    "https://raw.githubusercontent.com/efficience-it/docker-practice/refs/heads/v1.5/";
  try {
    const allQuestionsByTopic = await Promise.all(
      topics.map(async (topic) => {
        const yamlFileUrls = quizTopics[topic].yamlFiles.map(
          (file) => `${baseUrl}${file}`,
        );

        const topicQuestions = (
          await Promise.all(yamlFileUrls.map(fetchYaml))
        ).flat();
        return {
          topic,
          questions: questionsPerTopic
            ? shuffleArray(topicQuestions).slice(0, questionsPerTopic)
            : topicQuestions,
        };
      }),
    );

    return allQuestionsByTopic.flatMap(({ questions }) => questions);
  } catch (error) {
    console.error("Error loading questions:", error);
    displayError("Failed to load questions.");
    return [];
  }
}

async function fetchYamlFiles(topic) {
  if (!quizTopics[topic]) {
    displayError("Error: Unknown subject.");
    return;
  }

  updatePageTitles(quizTopics[topic].title);
  const questions = await fetchQuestionsFromTopics([topic]);

  questions.length
    ? displayQuestions(questions)
    : displayError("No question found.");
}

async function fetchGeneralQuiz() {
  const allTopics = Object.keys(quizTopics);
  const questionsPerTopic = Math.ceil(MAX_QUESTIONS / allTopics.length);
  const generalQuestions = await fetchQuestionsFromTopics(allTopics, questionsPerTopic);

  if (generalQuestions.length) {
    updatePageTitles("Quiz DCA - General Training");
    displayQuestions(generalQuestions);
  } else {
    displayError("No question found in general quiz.");
  }
}

async function fetchYaml(url) {
  const cacheKey = "yamlCache:" + url;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    // sessionStorage unavailable or corrupted, continue with fetch
  }
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Fetch failed: ${url}`);
    const yamlText = await response.text();
    const jsonData = jsyaml.load(yamlText);
    const questions = jsonData.questions || [];
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(questions));
    } catch (e) {
      // sessionStorage full, ignore
    }
    return questions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function checkResponses() {
  let counter = 0;
  const questionBlocks = document.querySelectorAll(".question-body");
  questionBlocks.forEach((questionBlock) => {
    const questionHeader = questionBlock
      .closest(".mb-4")
      .querySelector(".question-header");
    const expectedAnswers = JSON.parse(
      questionHeader.getAttribute("data-answers"),
    );

    const selectedAnswers = Array.from(
      questionBlock.querySelectorAll(".answers-container input:checked"),
    ).map((input) => input.value);

    const isCorrect =
      selectedAnswers.length === expectedAnswers.length &&
      selectedAnswers.every((val) => expectedAnswers.includes(val));

    const resultDiv = questionBlock.querySelector(".answer-section");
    const resultInfo = questionBlock.querySelector(".answer-section-text");
    resultDiv.classList.toggle("bg-green-100", isCorrect);
    resultDiv.classList.toggle("text-green-800", isCorrect);
    resultDiv.classList.toggle("bg-red-100", !isCorrect);
    resultDiv.classList.toggle("text-red-800", !isCorrect);
    resultInfo.innerHTML = isCorrect
      ? "✅ Correct answer(s). "
      : "❌ Wrong answer(s). ";

    if (isCorrect) counter++;
  });
  document.getElementById("score").textContent = `${counter}/${questionBlocks.length}`;
  saveQuizResult(counter, questionBlocks.length, getQueryParam("topic") || "General");
}

function saveQuizResult(score, total, category) {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  } catch (e) {
    history = [];
  }
  history.push({
    date: new Date().toISOString(),
    category: category,
    score: score,
    total: total,
  });
  history = history.slice(-10);
  localStorage.setItem("quizHistory", JSON.stringify(history));
}

const topic = getQueryParam("topic");
topic ? fetchYamlFiles(topic) : fetchGeneralQuiz();
