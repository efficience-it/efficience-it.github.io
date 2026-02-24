function escapeHTML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function updatePageTitles(title) {
  document.getElementById("page-title").textContent = title;
  document.getElementById("quiz-title").textContent = title;
}

function displayError(message) {
  document.getElementById("questions-container").innerHTML =
    `<div class="flex flex-col items-center justify-center py-20 text-center">
      <p class="text-red-600 font-medium mb-2">${message}</p>
      <p class="text-gray-500 text-sm mb-4">Please check your connection and try again.</p>
      <button onclick="location.reload()" class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition duration-200">Reload</button>
    </div>`;
}

function generateQuestionHTML(question, index) {
  const questionId = `question-${index}`;
  const answers = question.answers || [];
  const inputType =
    answers.filter((a) => a.correct).length > 1 ? "checkbox" : "radio";

  const shuffledAnswers = shuffleArray([...answers]);

  const optionsHTML = shuffledAnswers
    .map(
      (answer, i) => `
                <div class="answer-item flex items-start space-x-2">
                    <input class="form-${inputType} mt-1 flex-shrink-0" type="${inputType}" name="${questionId}" id="q${index}-option${i}" value="${escapeHTML(answer.value)}">
                    <label for="q${index}-option${i}" class="answer-label break-words overflow-wrap-anywhere flex-1">${escapeHTML(answer.value)}</label>
                </div>`,
    )
    .join("");

  return `
                <div class="mb-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                    <h5 class="question-header flex justify-between items-center font-semibold text-gray-700 dark:text-gray-200"
                        data-answers='${escapeHTML(JSON.stringify(answers.filter((a) => a.correct).map((a) => a.value)))}'>
                        <span class="question-header-title">${escapeHTML(question.question)}</span>
                        <button type="button" class="copy-uuid self-end text-sm text-gray-500 cursor-pointer hover:text-gray-700"
                              title="Click to copy UUID: ${question.uuid}"
                              aria-label="Copy question UUID"
                              data-uuid="${question.uuid}">ℹ️</button>
                    </h5>
                    <div class="question-body mt-2">
                        <div class="answers-container mt-2">${optionsHTML}</div>
                        <div class="hidden mt-2 p-2 rounded answer-section">
                            <span class="answer-section-text"></span>
                            🔗 <a href="${question.help}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline" aria-label="View source for this question">View source</a>
                        </div>
                    </div>
                </div>`;
}

function displayQuestions(questions) {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  shuffleArray(questions);
  container.innerHTML = questions
    .slice(0, MAX_QUESTIONS)
    .map((question, index) => generateQuestionHTML(question, index))
    .join("");

  // Progress tracking
  const totalQuestions = container.querySelectorAll(".question-body").length;
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");
  progressText.textContent = `0/${totalQuestions} answered`;
  progressBar.style.width = "0%";

  container.addEventListener("change", function () {
    const questionBlocks = container.querySelectorAll(".question-body");
    let answered = 0;
    questionBlocks.forEach((block) => {
      if (block.querySelector(".answers-container input:checked")) {
        answered++;
      }
    });
    progressText.textContent = `${answered}/${totalQuestions} answered`;
    progressBar.style.width = `${(answered / totalQuestions) * 100}%`;
  });

  // Listener to copy UUID
  container.querySelectorAll(".copy-uuid").forEach((el) => {
    el.addEventListener("click", function () {
      const uuid = this.dataset.uuid;
      navigator.clipboard.writeText(uuid).then(() => {
        this.textContent = "✅";
        alert(`UUID copied: ${uuid}`);
        setTimeout(() => {
          this.textContent = "ℹ️";
        }, 2000);
      });
    });
  });

  document
    .getElementById("quiz-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      checkResponses();
      document
        .querySelectorAll(".answer-section")
        .forEach((el) => el.classList.remove("hidden"));
      window.scrollTo(0, 0);
    });
}
