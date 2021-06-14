export interface IProductListItem {
    id: string,
    image_key: string,
    name: string,
    offer_ids: string[],
    price: {
        current_price: number,
        original_price: number,
        currency_code: string
    }
}

export interface IProduct {
    id: string,
    image_key: string,
    name: string,
    offer_ids: string[],
    information: {
        section_text: string,
        section_title: string
    }[],
    price: {
        current_price: number,
        original_price: number,
        currency_code: string
    }
}

export interface IUserOffers {
    id: string,
    available_badges: string,
    offers: {
        id: string,
        title: string,
        type: string
    }[]
}

export interface IOffer {
    id: string,
    title: string,
    type: string
}
