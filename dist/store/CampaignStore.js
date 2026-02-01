class CampaignStore {
    campaigns = new Map();
    save(id, campaign) {
        this.campaigns.set(id, campaign);
    }
    remove(id) {
        this.campaigns.delete(id);
    }
}
export { CampaignStore };
