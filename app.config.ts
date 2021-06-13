import { DocumentNode, gql } from '@apollo/client'

export const testUserId: number = 4
export const graphqlEndpoint: string = 'http://localhost:3001/graphql'

export const queryGetProducts: DocumentNode = gql`
    query getProducts {
        productList {
            id
            image_key
            name
            offer_ids
            price {
                original_price
                current_price
                currency_code
            }
        }
    }
`

export const queryGetProduct: DocumentNode = gql`
    query getProduct($id: String!) {
        product(id: $id) {
            id
            image_key
            name
            offer_ids
            information {
                section_text
                section_title
            }
            price {
                currency_code
                original_price
                current_price
            }
        }
    }
`

export const queryGetUserOffers: DocumentNode = gql`
    query getUserOffers($id: String!) {
        user(id: $id) {
            id
            available_badges
            offers {
                id
                title
                type
            }
        }
    }
`

export const currencySymbols: { [key: string]: string } = {
    GBP: '£',
    USD: '$',
    JPY: '¥',
}
