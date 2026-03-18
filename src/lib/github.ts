export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

export const fetchGitHubProjects = async (username: string): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    if (!response.ok) throw new Error("Failed to fetch GitHub repos");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
};
