
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { renderBlock } from '@/components/RenderBlock'

export default async function Page({
  params: paramsPromise,
}: {
  params: Promise<{ slug?: string[]; locale?: string }>
}) {

  const params = await paramsPromise
  const slugArray = params.slug ?? []
  const slug =  slugArray.join('/') || '/'
  console.log('test slug', slug)
  // const { locale } = params;

  // const allowedLocales = ['uk', 'en'];
  // const queryLocale = allowedLocales.includes(locale) ? (locale as 'uk' | 'en') : undefined;

  if (slug.startsWith('/_next') || slug === '/favicon.ico' || slug === '/robots.txt') {
    return notFound()
  }

  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
    },
  })

  const data = page.docs[0]

  if (!data) return notFound()

  return <main>{data.blocks?.map((block: any, i: number) => renderBlock(block, i))}</main>
}