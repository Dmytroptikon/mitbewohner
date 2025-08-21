'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Product = {
  id: string;
  name?: string;
  units?: string;
  quantity?: number;
  limit?: number;
  critical?: number;
  image?: {
    url?: string;
  };
};

type ProductsProps = {
  title?: string;
  criticalTitle?: string;
  optionTitle?: string;
  categoryId?: string;
};

export default function Shoping({ title, criticalTitle, optionTitle }: ProductsProps) {
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
        setProducts(data.docs || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Фільтруємо продукти на два окремі списки
  const criticalProducts = products.filter(
    (p) => (p.quantity ?? 0) < (p.critical ?? 0)
  );
  const limitProducts = products.filter(
    (p) => (p.quantity ?? 0) < (p.limit ?? 0)
  );

  const renderProductList = (productList: Product[], listTitle: string) => {
    if (productList.length === 0) {
      return <p>No products found in this category.</p>;
    }

    return (
      <>
        <h3>{listTitle}</h3>
        <ul>
          {productList.map((p) => (
            <li key={p.id}>
              <h4>{p.name}</h4>
              {p.image?.url && (
                <Image
                  src={p.image.url}
                  width={100}
                  height={100}
                  alt={p.name || 'Product Image'}
                />
              )}
              <p>Units: {p.units}</p>
              <p>Quantity: {p.quantity}</p>
              <p>Limit: {p.limit}</p>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div>
      <h2>{title ? title : 'Shopping List'}</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          {renderProductList(limitProducts, optionTitle ? optionTitle : 'Limit Products')}
          <hr />
          {renderProductList(criticalProducts, criticalTitle ? criticalTitle : 'Critical Products')}
        </>
      )}
    </div>
  );
}