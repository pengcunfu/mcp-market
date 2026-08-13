export interface McpServer {
  id: string;
  type: 'skill' | 'mcp';
  name: string;
  description: string;
  author: string;
  version: string;
  category: string;
  tags: string[];
  downloads: number;
  rating: number;
  reviews: number;
  repository: string;
  documentation: string;
  license: string;
  lastUpdated: string;
  dependencies?: string[];
  features: string[];
  logo?: string;
  screenshots?: string[];
  readme?: string;
}

export interface McpCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface CategoryStats {
  id: string;
  serverCount: number;
  totalDownloads: number;
  averageRating: number;
  topServers: McpServer[];
}

export interface FilterOptions {
  sortBy: 'name' | 'downloads' | 'rating' | 'updated';
  sortOrder: 'asc' | 'desc';
  category?: string;
  tags?: string[];
}
