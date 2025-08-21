'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Products.module.scss'

type Product = {
  id: string;
  name?: string;
  units?: string;
  quantity?: number;
  limit?: number;
  critical?: number;
};
type ProductsProps = {
  title?: string
  categoryId?: string
}

export default function Products({ title }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/get-products')
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`)
        }
        const data = await res.json()
        setProducts(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className={styles.section}>
      <div className="container">
        {/* <h2>{title || 'Products'}</h2> */}
        <h2 className={styles.title}>Products</h2>
        {products.length === 0 ? (
          <p className={styles.nofound}>No products found.</p>
        ) : (
          <ul className={styles.list}>
            {products.docs.map((p) => (
              <li className={styles.item} key={p.id}>
                <h3 className={styles.name}> {p.name}</h3>
                <div className={styles.row}>
                  <div className={styles.image}>
                    <Image 
                      src={p.image.url}
                      width={100}
                      height={100}
                      alt={p.name || 'Product Image'}
                      style={{ objectFit: 'contain', borderRadius: '10px' }}
                    />
                  </div>
                  <div className={styles.details}>
                    <p className={styles.text}>Units: {p.units}</p>
                    <p className={styles.text}>Quantity: {p.quantity}</p>
                    <p className={styles.text}>Limit: {p.limit}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
