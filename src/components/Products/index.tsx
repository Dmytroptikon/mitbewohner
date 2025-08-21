'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image'

type Product = {
  id: string;
  name?: string;
  units?: string;
  quantity?: number;
  limit?: number;
  critical?: number;
};
type ProductsProps = {
  title?: string;
  categoryId?: string;
};

export default function Products({ title }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/get-products');
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);


  return (
    <div>
      <h2>{title || 'Products'}</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.docs.map((p) => (
            <li key={p.id}>
              <h3> {p.name}</h3>
              <Image 
                src={p.image.url}
                width={100}
                height={100}
                alt={p.name || 'Product Image'}
              />
              <p>Units: {p.units}</p>
              <p>Quantity: {p.quantity}</p>
              <p>Limit: {p.limit}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
