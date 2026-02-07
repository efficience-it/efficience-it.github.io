function getQueryParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}

document.getElementById("restart-quiz").addEventListener("click", function() {
    const topic = getQueryParam("topic");
    if (topic) {
        window.location.href = window.location.pathname + "?topic=" + topic;
    } else {
        location.reload();
    }
});