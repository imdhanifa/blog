export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  code?: string;
  createdAt: string;
  author?: string;
  image?: string;
  tags?: string[];
  language?: string;
}
