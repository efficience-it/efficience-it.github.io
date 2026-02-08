const MAX_QUESTIONS = 20;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const quizTopics = {
  orchestration: {
    title: "Quiz DCA - Orchestration",
    yamlFiles: [
      "data/1_Orchestration/complete_setup_swarm_mode_cluster_managers_worker_nodes.yaml",
      "data/1_Orchestration/extend_run_containers_to_services.yaml",
      "data/1_Orchestration/describe_importance_quorum_swarm_cluster.yaml",
      "data/1_Orchestration/describe_difference_between_running_container_and_service.yaml",
      "data/1_Orchestration/interpret_output_docker_inspect_commend.yaml",
      "data/1_Orchestration/convert_to_stack_file.yaml",
      "data/1_Orchestration/manipulate_stacks.yaml",
      "data/1_Orchestration/increase_the_number_of_replicas.yaml",
      "data/1_Orchestration/add_networks_publish_ports.yaml",
      "data/1_Orchestration/mount_volumes.yaml",
      "data/1_Orchestration/replicated_vs_global_services.yaml",
      "data/1_Orchestration/apply_node_labels_placement_tasks.yaml",
      "data/1_Orchestration/use_templates_with_service_create.yaml",
      "data/1_Orchestration/troubleshoot_service.yaml",
      "data/1_Orchestration/legacy_communication.yaml",
      "data/1_Orchestration/k8s_pods_deployments.yaml",
      "data/1_Orchestration/k8s_configmap_secret.yaml",
    ],
  },
  image_creation_management_registry: {
    title: "Quiz DCA - Image Creation, Management, and Registry",
    yamlFiles: [
      "data/2_Image_creation_management_registry/describe_the_use_of_dockerfile.yaml",
      "data/2_Image_creation_management_registry/identify_display_main_parts_dockerfile.yaml",
      "data/2_Image_creation_management_registry/describe_demonstrate_how_create_efficient_image_via_dockerfile.yaml",
      "data/2_Image_creation_management_registry/describe_demonstrate_how_use_cli_command_manage_images_list_delete_prune_rmi.yaml",
      "data/2_Image_creation_management_registry/describe_demonstrate_how_to_inspec_images_report_specifi_attributes_using_filter_format.yaml",
      "data/2_Image_creation_management_registry/describe_demonstrate_how_to_tag_image.yaml",
      "data/2_Image_creation_management_registry/apply_file_create_image.yaml",
      "data/2_Image_creation_management_registry/display_layers.yaml",
      "data/2_Image_creation_management_registry/single_layer.yaml",
      "data/2_Image_creation_management_registry/describe_demonstrate_registry_functions.yaml",
      "data/2_Image_creation_management_registry/deploy_registry.yaml",
      "data/2_Image_creation_management_registry/log_into_a_registry.yaml",
      "data/2_Image_creation_management_registry/utilize_search_in_a_registry.yaml",
      "data/2_Image_creation_management_registry/push_an_image_to_a_registry.yaml",
      "data/2_Image_creation_management_registry/sign_an_image_in_a_registry.yaml",
      "data/2_Image_creation_management_registry/pull_delete_images_registry.yaml",
    ],
  },
  installation_and_configuration: {
    title: "Quiz DCA - Installation and Configuration",
    yamlFiles: [
      "data/3_installation_and_configuration/describe_sizing_requirements_for_installation.yaml",
      "data/3_installation_and_configuration/install_storage_driver.yaml",
      "data/3_installation_and_configuration/logging_drivers.yaml",
      "data/3_installation_and_configuration/swarm_setup_backup.yaml",
      "data/3_installation_and_configuration/hub_users_teams.yaml",
      "data/3_installation_and_configuration/describe_demonstrate_how_configure_docker_daemon_start_boot.yaml",
      "data/3_installation_and_configuration/cert_based_auth_registry.yaml",
      "data/3_installation_and_configuration/describe_namespaces_cgroups_certificates.yaml",
      "data/3_installation_and_configuration/install_troubleshooting.yaml",
      "data/3_installation_and_configuration/deploy_ucp_dtr_ha.yaml",
      "data/3_installation_and_configuration/backup_ucp_dtr.yaml",
    ],
  },
  networking: {
    title: "Quiz DCA - Networking",
    yamlFiles: [
      "data/4_Networking/container_network_model.yaml",
      "data/4_Networking/describe_different_types_use_cases_built_in_network_drivers.yaml",
      "data/4_Networking/describe_engine_registry_ucp_traffic.yaml",
      "data/4_Networking/bridge_network_create.yaml",
      "data/4_Networking/describe_demonstrate_publish_port_application_accessible_externally.yaml",
      "data/4_Networking/identify_container_ip_port.yaml",
      "data/4_Networking/compare_contrats_host_ingress_publishing_modes.yaml",
      "data/4_Networking/configure_external_dns.yaml",
      "data/4_Networking/http_https_load_balancing.yaml",
      "data/4_Networking/understand_engine_registry_ucp_traffic.yaml",
      "data/4_Networking/deploy_overlay_service.yaml",
      "data/4_Networking/troubleshoot_container_connectivity.yaml",
      "data/4_Networking/k8s_clusterip_nodeport.yaml",
      "data/4_Networking/describe_kubernetes_container_network_model.yaml",
    ],
  },
  security: {
    title: "Quiz DCA - Security",
    yamlFiles: [
      "data/5_Security/describe_security_administration_tasks.yaml",
      "data/5_Security/describe_process_signing_image.yaml",
      "data/5_Security/describe_default_engine_security.yaml",
      "data/5_Security/swarm_default_security.yaml",
      "data/5_Security/describe_mtls.yaml",
      "data/5_Security/security_identity_roles.yaml",
      "data/5_Security/compare_contrast_ucp_workers_managers.yaml",
      "data/5_Security/external_certs_ucp_dtr.yaml",
      "data/5_Security/image_security_scan.yaml",
      "data/5_Security/describe_demonstrate_how_enable_docker_content_trust.yaml",
      "data/5_Security/ucp_rbac_config.yaml",
      "data/5_Security/ucp_ldap_ad_integration.yaml",
      "data/5_Security/ucp_client_bundle.yaml",
    ],
  },
  storage_and_volumes: {
    title: "Quiz DCA - Storage and Volumes",
    yamlFiles: [
      "data/6_storage_and_volumes/graph_drivers.yaml",
      "data/6_storage_and_volumes/describe_demonstrate_how_to_configure_devicemapper.yaml",
      "data/6_storage_and_volumes/contrast_object.yaml",
      "data/6_storage_and_volumes/layers_filesystem.yaml",
      "data/6_storage_and_volumes/persistent_storage.yaml",
      "data/6_storage_and_volumes/unused_images.yaml",
      "data/6_storage_and_volumes/volume_cluster.yaml",
      "data/6_storage_and_volumes/peristent_volumes.yaml",
      "data/6_storage_and_volumes/relationship_storage_volume.yaml",
    ],
  },
};

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
  const generalQuestions = await fetchQuestionsFromTopics(allTopics, 2);

  if (generalQuestions.length) {
    updatePageTitles("Quiz DCA - General Training");
    displayQuestions(generalQuestions);
  } else {
    displayError("No question found in general quiz.");
  }
}

async function fetchYaml(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Fetch failed: ${url}`);
    const yamlText = await response.text();
    const jsonData = jsyaml.load(yamlText);
    return jsonData.questions || [];
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
  document.getElementById("questions-container").innerHTML =
    `<p class='text-red-600'>${message}</p>`;
}

function displayQuestions(questions) {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  shuffleArray(questions);
  questions.slice(0, MAX_QUESTIONS).forEach((question, index) => {
      container.innerHTML += generateQuestionHTML(question, index);
    });

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
                <div class="mb-4 p-4 border rounded-lg bg-gray-50">
                    <h5 class="question-header flex justify-between items-center font-semibold text-gray-700" 
                        data-answers='${escapeHTML(JSON.stringify(answers.filter((a) => a.correct).map((a) => a.value)))}'>
                        <span class="question-header-title">${escapeHTML(question.question)}</span>
                        <span class="copy-uuid self-end text-sm text-gray-500 cursor-pointer hover:text-gray-700" 
                              title="Click to copy UUID: ${question.uuid}"
                              data-uuid="${question.uuid}">ℹ️</span>
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
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
}

const topic = getQueryParam("topic");
topic ? fetchYamlFiles(topic) : fetchGeneralQuiz();
