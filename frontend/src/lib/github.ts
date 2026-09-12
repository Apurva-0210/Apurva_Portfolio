import { profile } from "@/data/profile";

export interface GithubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
}

export interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string | null;
  fork: boolean;
  private: boolean;
  visibility: string;
}

export interface GithubPortfolioData {
  profile: GithubProfile;
  repositories: GithubRepository[];
}

type GithubUserPayload = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
};

type GithubRepoPayload = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string | null;
  fork: boolean;
  private: boolean;
  visibility?: string;
};

const GITHUB_API = "https://api.github.com";
const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`GitHub request failed with ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function fetchGithubPortfolio(): Promise<GithubPortfolioData> {
  const username = profile.githubUsername;
  const [profilePayload, repositoriesPayload] = await Promise.all([
    fetch(`${GITHUB_API}/users/${username}`, { headers: GITHUB_HEADERS }).then((res) =>
      readJson<GithubUserPayload>(res),
    ),
    fetch(
      `${GITHUB_API}/users/${username}/repos?type=owner&sort=updated&direction=desc&per_page=100`,
      { headers: GITHUB_HEADERS },
    ).then((res) => readJson<GithubRepoPayload[]>(res)),
  ]);

  return {
    profile: {
      login: profilePayload.login,
      name: profilePayload.name,
      bio: profilePayload.bio,
      avatar_url: profilePayload.avatar_url,
      html_url: profilePayload.html_url,
      public_repos: profilePayload.public_repos,
    },
    repositories: repositoriesPayload
      .filter((repository) => !repository.private && !repository.fork)
      .map((repository) => ({
        id: repository.id,
        name: repository.name,
        full_name: repository.full_name,
        html_url: repository.html_url,
        description: repository.description,
        language: repository.language,
        stargazers_count: repository.stargazers_count,
        updated_at: repository.updated_at,
        fork: repository.fork,
        private: repository.private,
        visibility: repository.visibility ?? "public",
      })),
  };
}
