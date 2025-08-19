
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (
  request: Request
) => {
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    limit: 10,
  })

  return Response.json(products)
}