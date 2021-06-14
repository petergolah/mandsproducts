import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { IProductListItem, IUserOffers } from '../lib/interfaces'
import { testUserId, graphqlEndpoint, queryGetProducts, currencySymbols, queryGetUserOffers } from '../app.config'
import { getBadge } from '../lib/lib'

export default function Home({ productList, userOffers }: { productList: IProductListItem[], userOffers: IUserOffers }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Product List</title>
                <meta name="description" content="grid of available products" />
                <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    M&S Collection
                </h1>

                <div className={styles.grid}>
                    { productList.map( (product: IProductListItem, index: number, products: IProductListItem[]) => {
                        const ccySymbol: string = currencySymbols[product.price.currency_code] || `${product.price.currency_code} `
                        const badge: string = getBadge(product.offer_ids, userOffers.available_badges, userOffers.offers)
                        return (
                            <a key={product.id} href={`/product/${product.id}`} className={styles.card}>
                                <Image className={styles.image}
                                    src={`https://asset1.cxnmarksandspencer.com/is/image/mands/${product.image_key}`}
                                    alt={product.name}
                                    width={308}
                                    height={400}
                                />
                                <div className={styles.details}>
                                    <h2>{product.name}</h2>
                                    <p className={product.price.original_price ? styles.onsale : ''}>{ccySymbol}{(+product.price.current_price / 100).toFixed(2)}</p>
                                    {product.price.original_price &&
                                        <p>Original: {ccySymbol}{(+product.price.original_price / 100).toFixed(2)}</p>
                                    }
                                    <img className={styles.badge} src={badge ? `/${badge}_icon.jpg`: ''} />
                                </div>
                            </a>
                        )})
                    }
                </div>
            </main>

            <footer className={styles.footer}>
                <a href="https://github.com/petergolah/mandsproducts" target="_blank">&copy; PGO</a>
            </footer>
        </div>
    )
}

export async function getServerSideProps() {
    let client = new ApolloClient({
        uri: graphqlEndpoint,
        cache: new InMemoryCache()
    })

    const { data: { productList = []} } = await client.query({ query: queryGetProducts })
    const { data: { user: userOffers = {}} } = await client.query(
        {
            query: queryGetUserOffers,
            variables: {
                id: String(testUserId)
            }
        }
    )

    return {
        props: { productList, userOffers }
    }
}
