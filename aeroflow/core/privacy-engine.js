const PrivacyEngine = {
    placeholders: {
        EMAIL: "email_field",
        PASSWORD: "password_field",
        USERNAME: "username_field",
        PHONE: "phone_field"
    },
    getPlaceholder(type) {
        return this.placeholders[type] || "sensitive_field";
    },
    protectField(input, type) {
        if (!input || input.dataset.aeroflowProtected === "true") {
            return;
        }
        const placeholder = this.getPlaceholder(type);
        input.dataset.aeroflowProtected = "true";
        input.dataset.aeroflowType = type;
        input.dataset.aeroflowOriginalPlaceholder =
            input.placeholder || "";
        input.placeholder = placeholder;
        input.style.border = "2px solid #ff5b5b";
        if (
            type === "PASSWORD" ||
            type === "EMAIL" ||
            type === "USERNAME" ||
            type === "PHONE"
        ) {
            input.setAttribute(
                "autocomplete",
                "off"
            );
        }
        console.log(
            `AeroFlow is Protected ${type} field`
        );
    },
    protectPage() {
        const fields = PIIDetector.scanPage();
        fields.forEach(field => {
            this.protectField(
                field.element,
                field.type
            );
        });
        console.log(
            `[AeroFlow] ${fields.length} sensitive field(s) protected`
        );
        return fields;
    },
    observePage() {
        const observer = new MutationObserver(() => {
            const fields = PIIDetector.scanPage();
            fields.forEach(field => {
                this.protectField(
                    field.element,
                    field.type
                );
            });
        });
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
        console.log(
            "AeroFlow is Watching for new sensitive fields"
        );
        return observer;
    },
    start() {
        const fields = this.protectPage();
        this.observePage();
        return fields;
    }
};