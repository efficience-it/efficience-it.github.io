async function fetchYamlFiles(topic) {
    if (!twigQuizTopics[topic]) {
        displayError("Error : Unknown subject.");
        return;
    }

    updatePageTitles(twigQuizTopics[topic].title);
    const yamlFileUrls = twigQuizTopics[topic].yamlFiles.map(file => 
        `https://raw.githubusercontent.com/efficience-it/certification-twig/3.x/data/${file}`
    );

    try {
        const allQuestions = (await Promise.all(yamlFileUrls.map(fetchYaml))).flat();
        allQuestions.length ? displayQuestions(allQuestions) : displayError("No question found.");
    } catch (error) {
        console.error("Error loading YAML files :", error);
        displayError("An error has occurred.");
    }
}

async function fetchYaml(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Recovery failed : ${url}`);
        const yamlText = await response.text();
        const jsonData = jsyaml.load(yamlText);
        return jsonData.entities || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

function updatePageTitles(title) {
    document.getElementById("page-title").textContent = title;
    document.getElementById("quiz-title").textContent = title;
}

function displayError(message) {
    document.getElementById("questions-container").innerHTML = `<p class='text-red-600'>${message}</p>`;
}

function displayQuestions(questions) {
    const container = document.getElementById("questions-container");
    container.innerHTML = "";

    questions.sort(() => Math.random() - 0.5).slice(0, 20).forEach((question, index) => {
        container.innerHTML += generateQuestionHTML(question, index);
    });

    document.getElementById("quiz-form").addEventListener("submit", function (event) {
        event.preventDefault();
        checkResponses();
        document.querySelectorAll(".answer-section").forEach(el => el.classList.remove("hidden"));
        window.scrollTo(0, 0);
    });
}

function generateQuestionHTML(question, index) {
    const questionId = `question-${index}`;
    const answers = question.answers || [];
    const inputType = answers.filter(a => a.correct).length > 1 ? "checkbox" : "radio";

    const optionsHTML = answers.map((answer, i) => `
        <div class="answer-item flex items-center space-x-2">
            <input class="form-${inputType}" type="${inputType}" name="${questionId}" id="q${index}-option${i}" value="${escapeHTML(answer.value)}">
            <label for="q${index}-option${i}" class="answer-label">${escapeHTML(answer.value)}</label>
        </div>`).join("");

    return `
        <div class="mb-4 p-4 border rounded-lg bg-gray-50">
            <h5 class="question-header flex justify-between items-center font-semibold text-gray-700" 
                data-answers='${escapeHTML(JSON.stringify(answers.filter(a => a.correct).map(a => a.value)))}'>
                <span class="question-header-title">${escapeHTML(question.question)}</span>
            </h5>
            <div class="question-body mt-2">
                <div class="answers-container mt-2">${optionsHTML}</div>
                <div class="hidden mt-2 p-2 rounded answer-section">
                    <span class="answer-section-text"></span>
                    🔗 <a href="${question.help}" target="_blank" class="text-blue-600 underline">View source</a>
                </div>
            </div>
        </div>`;
}

function escapeHTML(text) {
    let escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    
    escaped = escaped.replace(/`([^`]+)`/g, "<code class='bg-gray-100 text-red-600 font-mono px-1 rounded'>$1</code>");

    return escaped;
}


function checkResponses() {
    let counter = 0;
    document.querySelectorAll(".question-body").forEach((questionBlock) => {
        const questionHeader = questionBlock.closest(".mb-4").querySelector(".question-header");
        const expectedAnswers = JSON.parse(questionHeader.getAttribute("data-answers"));

        const selectedAnswers = Array.from(questionBlock.querySelectorAll(".answers-container input:checked"))
            .map(input => input.value);

        const isCorrect = selectedAnswers.length === expectedAnswers.length &&
                        selectedAnswers.every(val => expectedAnswers.includes(val));

        const resultDiv = questionBlock.querySelector(".answer-section");
        const resultInfo = questionBlock.querySelector(".answer-section-text");
        resultDiv.classList.toggle("bg-green-100", isCorrect);
        resultDiv.classList.toggle("text-green-800", isCorrect);
        resultDiv.classList.toggle("bg-red-100", !isCorrect);
        resultDiv.classList.toggle("text-red-800", !isCorrect);
        resultInfo.innerHTML = isCorrect ? "✅ Correct answer(s). " : "❌ Wrong answer(s). ";

        if (isCorrect) counter++;
    });
    document.getElementById('score').textContent = `${counter}/20`;
}

fetchYamlFiles('data');
