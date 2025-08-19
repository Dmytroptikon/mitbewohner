import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '@/payload-types'

const formatPath = (url: string | null | undefined): string => {
  if (!url) return '';
  if (url === '/') return '/';
  return url.startsWith('/') ? url : `/${url}`;
};

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const currentPath = formatPath(doc.slug);

    if (currentPath) {
      payload.logger.info(`Revalidating current page path: ${currentPath}`);
      revalidatePath(currentPath);
      revalidateTag('pages-sitemap');
    }

    if (previousDoc?.slug && doc.slug !== previousDoc.slug) {
      const oldPath = formatPath(previousDoc.slug);
      if (oldPath) {
        payload.logger.info(`Revalidating old page path: ${oldPath} due to URL change`);
        revalidatePath(oldPath);
        revalidateTag('pages-sitemap');
      }
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    
    const path = formatPath(doc?.slug);

    if (path) {
      payload.logger.info(`Revalidating path: ${path} after page deletion`);
      revalidatePath(path);
      revalidateTag('pages-sitemap');
    }
  }
  return doc;
};