(async function () {
    console.log("AeroFlow started");
    const website =
        WebsiteDetector.getCurrentWebsite();
    console.log(
        "[AeroFlow] Website:",
        website.hostname
    );
    const trusted =
        await TrustEngine.isTrusted(
            website.hostname
        );
    if (trusted) {
        console.log(
            `[AeroFlow] 😘 TRUSTED: ${website.hostname}`
        );
        document.documentElement.dataset.aeroflowStatus =
            "trusted";
    } else {
        console.log(
            `[AeroFlow] 🫠 UNTRUSTED: ${website.hostname}`
        );
        document.documentElement.dataset.aeroflowStatus =
            "untrusted";
        const fields =
            PrivacyEngine.start();
        console.log(
            "AeroFlow is Protected fields:",
            fields
        );
    }

})();