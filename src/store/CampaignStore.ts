import { Campaign } from "../states/campaignStates/Campaign.js"

class CampaignStore {
    private campaigns = new Map<string, Campaign>()

    save(id: string, campaign: Campaign){
        this.campaigns.set(id, campaign)
    }

    remove(id: string){
        this.campaigns.delete(id)
    }
}

export {CampaignStore}