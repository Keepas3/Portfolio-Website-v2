import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId:
    import.meta.env.PUBLIC_SANITY_PROJECT_ID ||
    import.meta.env.SANITY_PROJECT_ID,
  dataset:
    import.meta.env.PUBLIC_SANITY_DATASET ||
    import.meta.env.SANITY_DATASET ||
    'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export interface SiteSettings {
  resumeUrl: string | null;
  aboutHeadline: string | null;
  aboutParagraphs: string[] | null;
  coreLanguages: string | null;
  projectsBuilt: string | null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const result = await sanity.fetch<{
      resumeUrl: string | null;
      aboutHeadline: string | null;
      aboutParagraphs: string[] | null;
      coreLanguages: string | null;
      projectsBuilt: string | null;
    } | null>(`*[_type == "siteSettings"][0]{
      "resumeUrl": resume.asset->url,
      aboutHeadline,
      aboutParagraphs,
      coreLanguages,
      projectsBuilt
    }`);
    return {
      resumeUrl: result?.resumeUrl ?? null,
      aboutHeadline: result?.aboutHeadline ?? null,
      aboutParagraphs: result?.aboutParagraphs ?? null,
      coreLanguages: result?.coreLanguages ?? null,
      projectsBuilt: result?.projectsBuilt ?? null,
    };
  } catch {
    return {
      resumeUrl: null,
      aboutHeadline: null,
      aboutParagraphs: null,
      coreLanguages: null,
      projectsBuilt: null,
    };
  }
}

export async function getResumeUrl(): Promise<string | null> {
  const settings = await getSiteSettings();
  return settings.resumeUrl;
}
