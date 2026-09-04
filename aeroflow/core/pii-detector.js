const PIIDetector = {
    detectField(input) {
        const type = (input.type || "").toLowerCase();
        const name = (input.name || "").toLowerCase();
        const id = (input.id || "").toLowerCase();
        const placeholder = (input.placeholder || "").toLowerCase();
        const autocomplete = (input.autocomplete || "").toLowerCase();
        const text = `${type} ${name} ${id} ${placeholder} ${autocomplete}`;
        if (type === "password" || text.includes("password")) {
            return "PASSWORD";
        }
        if (
            type === "email" ||
            text.includes("email")
        ) {
            return "EMAIL";
        }
        if (
            text.includes("username") ||
            text.includes("user-name") ||
            autocomplete.includes("username")
        ) {
            return "USERNAME";
        }
        if (
            text.includes("phone") ||
            text.includes("mobile") ||
            type === "tel"
        ) {
            return "PHONE";
        }
        return null;
    },
    scanPage() {
        const inputs = document.querySelectorAll(
            "input, textarea"
        );
        const detected = [];
        inputs.forEach(input => {
            const type = this.detectField(input);
            if (type) {
                detected.push({
                    element: input,
                    type: type
                });
            }
        });
        return detected;
    }
};