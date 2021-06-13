import { gql } from '@apollo/client'

export const graphqlEndpoint = 'http://localhost:3001/graphql'

export const queryGetProducts = gql`
    query getProducts {
        productList {
            id
            image_key
            name
            price {
                original_price
                current_price
                currency_code
            }
        }
    }
`

export const queryGetProduct = gql`
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
