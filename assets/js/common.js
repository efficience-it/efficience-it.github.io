document.getElementById("restart-quiz").addEventListener("click", function() {
    const url = new URL(window.location.href);
    const topic = url.searchParams.get("topic");
    if (topic) {
        window.location.href = url.pathname + "?topic=" + topic;
    } else {
        location.reload();
    }
});