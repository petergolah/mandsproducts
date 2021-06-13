import Head from 'next/head'
import styles from '../../styles/ProductPage.module.css'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { useRouter } from 'next/router'
import { IProduct } from '../../interfaces'
import { graphqlEndpoint, queryGetProduct } from '../../app.config'

export default function ProductPage({ product }: { product: IProduct } ) {
    const router = useRouter()
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
                <button onClick={() => router.back()}>Back</button>
                <h1 className={styles.title}>

                    {product.name}
                </h1>
            </main>
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

    return {
        props: { product }
    }
}
