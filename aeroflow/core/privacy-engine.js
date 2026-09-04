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
        if (!input) {
            return;
        }
        if (input.dataset.aeroflowProtected === "true") {
            return;
        }
        input.dataset.aeroflowProtected = "true";
        input.dataset.aeroflowType = type;
        input.placeholder =
            this.getPlaceholder(type);
        input.style.border =
            "2px solid #ff5b5b";
        console.log(
            `[AeroFlow] 🔐 Protected ${type} field`
        );
    },
    protectPage() {
        const fields =
            PIIDetector.scanPage();
        fields.forEach(field => {
            this.protectField(
                field.element,
                field.type
            );

        });
        return fields;
    },
    protectForms() {
        const forms =
            document.querySelectorAll("form");
        forms.forEach(form => {
            if (
                form.dataset.aeroflowProtected ===
                "true"
            ) {
                return;
            }
            form.dataset.aeroflowProtected =
                "true";
            console.log(
                "[AeroFlow] 🛡️ Protected form"
            );
        });
    },
    handleSubmit(event) {
        const status =
            document.documentElement
                .dataset.aeroflowStatus;
        if (status !== "untrusted") {
            return;
        }
        const form = event.target;
        if (!form || form.tagName !== "FORM") {
            return;
        }
        console.log(
            "[AeroFlow] 🚨 Intercepting untrusted form"
        );
        const fields =
            form.querySelectorAll(
                "input, textarea"
            );
        let protectedCount = 0;
        fields.forEach(input => {
            const protectedField =
                input.dataset.aeroflowProtected;

            const type =
                input.dataset.aeroflowType;

            if (
                protectedField === "true" &&
                type
            ) {
                const safeValue =
                    this.getPlaceholder(type);
                console.log(
                    `[AeroFlow] 🔒 Replacing ${type}`
                );
                input.value = safeValue;

                protectedCount++;
            }
        });
        console.log(
            `[AeroFlow] ✅ ${protectedCount} sensitive value(s) sanitized`
        );
    },
    observePage() {
        const observer =
            new MutationObserver(() => {
                this.protectPage();
                this.protectForms();
            });
        observer.observe(
            document.documentElement,
            {
                childList: true,
                subtree: true
            }
        );
        console.log(
            "[AeroFlow]  Watching for new forms and fields"
        );
        return observer;
    },
    start() {
        this.protectPage();
        this.protectForms();
        document.addEventListener(
            "submit",
            this.handleSubmit.bind(this),
            true
        );
        this.observePage();
        console.log(
            "[AeroFlow] 🔐 Privacy Engine started"
        );
        return PIIDetector.scanPage();
    }
};