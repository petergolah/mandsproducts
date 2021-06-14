import { IOffer } from './interfaces'

export function getBadge(offers_ids: string[], available_badges: string, user_offers: IOffer[]): string {
    let badges_offerTypes: [ string, Set<string> ][] = []
    for (let badges_offerTypes_str of available_badges.split('||')) {
        let [ badge, offerTypes_str ] = badges_offerTypes_str.split(':')
        let offerTypes: Set<string> = new Set(offerTypes_str.split(','))
        badges_offerTypes.push([ badge, offerTypes ])
    }
    for (let offer_id of offers_ids) {
        for (let user_offer of user_offers) {
            if (offer_id === user_offer.id) {
                for (let badge_offerType of badges_offerTypes) {
                    if (badge_offerType[1].has(user_offer.type)) {
                        return badge_offerType[0]
                    }
                }
            }
        }
    }
    return ''
}
