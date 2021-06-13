import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { IProductListItem } from '../interfaces'
import { graphqlEndpoint, queryGetProducts, currencySymbols } from '../app.config'

export default function Home({ productList }: { productList: IProductListItem[]}) {
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
                    Product List
                </h1>

                <div className={styles.grid}>
                    { productList.map( (product: IProductListItem, index: number, products: IProductListItem[]) => {
                        const ccySymbol: string = currencySymbols[product.price.currency_code] || product.price.currency_code
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
                                    <p className={product.price.original_price ? styles.onsale : ''}>{ccySymbol} {(+product.price.current_price / 100).toFixed(2)}</p>
                                    {product.price.original_price &&
                                        <p>Original: {ccySymbol} {(+product.price.original_price / 100).toFixed(2)}</p>
                                    }
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

    return {
        props: { productList }
    }
}
