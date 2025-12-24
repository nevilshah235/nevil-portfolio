export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Insight {
  id: string;
  author: string;
  date: string;
  excerpt: string;
  readMoreUrl?: string;
  avatar?: string;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  color: string;
  connections: string[];
}

export interface KnowledgeStack {
  central: KnowledgeNode;
  nodes: KnowledgeNode[];
}

