import { XMLParser } from "fast-xml-parser";
import { siteConfig } from "@/config/site";

export type YoutubeVideo = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnailUrl: string;
  url: string;
};

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${siteConfig.youtube.channelId}`;

export async function getLatestVideos(limit = 6): Promise<YoutubeVideo[]> {
  const res = await fetch(FEED_URL, {
    // Revalidate periodically so new uploads show up without a redeploy.
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const xml = await res.text();
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
  const parsed = parser.parse(xml);

  const entries = parsed?.feed?.entry;
  if (!entries) return [];

  const list = Array.isArray(entries) ? entries : [entries];

  const sorted = [...list].sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  );

  return sorted.slice(0, limit).map((entry) => {
    const videoId: string = entry["yt:videoId"];
    const thumb =
      entry["media:group"]?.["media:thumbnail"]?.["@_url"] ??
      `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    return {
      id: videoId,
      title: entry.title,
      publishedAt: entry.published,
      thumbnailUrl: thumb,
      url: `https://www.youtube.com/watch?v=${videoId}`,
    };
  });
}
