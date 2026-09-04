const WebsiteDetector = {
    getCurrentWebsite() {
        return {
            hostname: window.location.hostname,
            origin: window.location.origin,
            protocol: window.location.protocol
        };
    },
    getDomain() {
        return window.location.hostname;
    },
    isHttpWebsite() {
        return (
            window.location.protocol === "http:" ||
            window.location.protocol === "https:"
        );
    }
};