async function loadPopup() {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });
    if (!tab || !tab.url) {
        return;
    }
    const url = new URL(tab.url);
    const hostname = url.hostname;
    document.getElementById("website").textContent =
        hostname;
    const trusted =
        await TrustEngine.isTrusted(hostname);
    const status =
        document.getElementById("status");
    const message =
        document.getElementById("message");
    if (trusted) {
        status.textContent =
            "😘 TRUSTED";
        status.className =
            "status trusted";
        message.textContent =
            "Real sensitive data is allowed for authentication.";
    } else {
        status.textContent =
            "🫠 UNTRUSTED";
        status.className =
            "status untrusted";
        message.textContent =
            "Sensitive fields are protected.";
    }
}
loadPopup();