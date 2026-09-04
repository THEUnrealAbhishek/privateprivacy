const TrustEngine = {
    defaultTrustedSites: [
        "accounts.google.com",
        "github.com",
        "login.microsoftonline.com"
    ],
    async getTrustedSites() {
        const result = await chrome.storage.local.get({
            trustedSites: this.defaultTrustedSites
        });
        return result.trustedSites;
    },
    async isTrusted(hostname) {
        const trustedSites = await this.getTrustedSites();
        return trustedSites.includes(hostname);
    },
    async addTrustedSite(hostname) {
        const sites = await this.getTrustedSites();
        if (!sites.includes(hostname)) {
            sites.push(hostname);
            await chrome.storage.local.set({
                trustedSites: sites
            });
        }
    },
    async removeTrustedSite(hostname) {
        const sites = await this.getTrustedSites();
        const updated = sites.filter(site => site !== hostname);
        await chrome.storage.local.set({
            trustedSites: updated
        });
    }
};