export interface NugetInfo {
  version: string;
  published: Date;
  url: string;
}

const cache = new Map<string, Promise<NugetInfo | null>>();

const fetchJson = async (url: string) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
};

const load = async (id: string): Promise<NugetInfo | null> => {
  try {
    const index = await fetchJson(
      `https://api.nuget.org/v3/registration5-gz-semver2/${id.toLowerCase()}/index.json`
    );
    const lastPage = index.items[index.items.length - 1];
    const page = lastPage.items ? lastPage : await fetchJson(lastPage['@id']);
    const stable = page.items
      .map((item: any) => item.catalogEntry)
      .filter((entry: any) => entry.listed !== false && !entry.version.includes('-'));
    const latest = stable[stable.length - 1];
    if (!latest) return null;
    return {
      version: latest.version,
      published: new Date(latest.published),
      url: `https://www.nuget.org/packages/${id}`,
    };
  } catch (error) {
    // NuGet onbereikbaar: toon gewoon geen badge, de build mag hier niet op falen.
    console.warn(`[nuget] ${id}: ${error instanceof Error ? error.message : error}`);
    return null;
  }
};

export const getNugetInfo = (id: string): Promise<NugetInfo | null> => {
  if (!cache.has(id)) cache.set(id, load(id));
  return cache.get(id)!;
};
