export interface Game {
  id: string;
  name: string;
  description: string;
  url: string;
  image: string;
  status: 'live' | 'coming-soon' | 'beta';
  featured?: boolean;
  tags?: string[];
}
