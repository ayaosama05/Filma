export type video = {
  key: string;
  name: string;
  type: string;
  published_at: string;
};

export type videoResponse = {
  id: string;
  results: video[];
};
