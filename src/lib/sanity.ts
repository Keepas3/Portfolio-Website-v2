import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export async function getResumeUrl(): Promise<string | null> {
  try {
    const result = await sanity.fetch<{ url: string } | null>(
      `*[_type == "siteSettings"][0]{ "url": resume.asset->url }`
    );
    return result?.url ?? null;
  } catch {
    return null;
  }
}
