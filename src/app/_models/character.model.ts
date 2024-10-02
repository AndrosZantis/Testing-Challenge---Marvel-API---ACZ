export interface Character {
  id: number;
  name: string;
  description: string;
  modified: Date;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Series;
  stories: Stories;
  events: Events;
  urls: Url[];
}

interface Thumbnail {
  path: string;
  extension: string;
}

interface Comics {
  available: number;
  collectionURI: string;
  items: ComicItem[];
  returned: number;
}

interface ComicItem {
  resourceURI: string;
  name: string;
}

interface Series {
  available: number;
  collectionURI: string;
  items: SeriesItem[];
  returned: number;
}

interface SeriesItem {
  resourceURI: string;
  name: string;
}

interface Stories {
  available: number;
  collectionURI: string;
  items: StoryItem[];
  returned: number;
}

interface StoryItem {
  resourceURI: string;
  name: string;
  type: string;
}

interface Events {
  available: number;
  collectionURI: string;
  items: EventItem[];
  returned: number;
}

interface EventItem {
  resourceURI: string;
  name: string;
}

interface Url {
  type: string;
  url: string;
}
