import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/ProductPage.module.css'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { IProduct, IUserOffers } from '../../interfaces'
import { testUserId, graphqlEndpoint, queryGetProduct, queryGetUserOffers, currencySymbols } from '../../app.config'
import { getBadge } from '../../lib'

export default function ProductPage({ product, userOffers }: { product: IProduct, userOffers: IUserOffers } ) {
    const ccySymbol: string = currencySymbols[product.price.currency_code] || `${product.price.currency_code} `
    const badge: string = getBadge(product.offer_ids, userOffers.available_badges, userOffers.offers)
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
                <a className={styles.back} href="/">Back</a>
                <h1 className={styles.title}>
                    {product.name}
                </h1>
                <Image className={styles.image}
                    src={`https://asset1.cxnmarksandspencer.com/is/image/mands/${product.image_key}`}
                    alt={product.name}
                    width={308}
                    height={400}
                />
                <p className={product.price.original_price ? styles.onsale : ''}>{ccySymbol}{(+product.price.current_price / 100).toFixed(2)}</p>
                {product.price.original_price &&
                    <p>Original: {ccySymbol}{(+product.price.original_price / 100).toFixed(2)}</p>
                }
                <img className={styles.badge} src={badge ? `/${badge}_icon.jpg`: ''} />
                <h2>{product.information[0].section_title}</h2>
                <p className={styles.info}>{product.information[0].section_text}</p>
            </main>

            <footer className={styles.footer}>
                <a href="https://github.com/petergolah/mandsproducts" target="_blank">&copy; PGO</a>
            </footer>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    let client = new ApolloClient({
        uri: graphqlEndpoint,
        cache: new InMemoryCache()
    })

    const { data: { product } } = await client.query(
        {
            query: queryGetProduct,
            variables: {
                id: context.params.id
            }
        }
    )
    const { data: { user: userOffers = {}} } = await client.query(
        {
            query: queryGetUserOffers,
            variables: {
                id: String(testUserId)
            }
        }
    )

    return {
        props: { product, userOffers }
    }
}
