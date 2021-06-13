import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

interface Product {
  id: string,
  image_key: string,
  name: string,
  price: {
    current_price: number,
    original_price: number
  }
}

export default function Home({ productList } : { productList: Product[]}) {
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
          { productList.map( (product: Product, index: number, products: Product[]) => {
            return (
              <a key={product.id} href="" className={styles.card}>
                <h2>{product.name}</h2>
                <p>Price {product.price.current_price}</p>
                {product.price.original_price &&
                  <p>Original price {product.price.original_price}</p>
                }
                <Image
                  src={`https://asset1.cxnmarksandspencer.com/is/image/mands/${product.image_key}`}
                  alt={product.name}
                  width={308}
                  height={400}
                />
              </a>
            )})
          }
        </div>
      </main>

      <footer className={styles.footer}>
        &copy; PGO
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  let client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache()
  })

  const { data: { productList = []} } = await client.query({
    query: gql`
      query getProducts {
        productList {
          id
          image_key
          name
          price {
              original_price
              current_price
          }
        }
      }
    `
  })

  console.log('Product List', productList)

  return {
    props: { productList }
  }
}
