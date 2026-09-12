from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class GithubProfile(BaseModel):
    login: str
    name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: str
    html_url: str
    public_repos: int


class GithubRepository(BaseModel):
    id: int
    name: str
    full_name: str
    html_url: str
    description: Optional[str] = None
    language: Optional[str] = None
    stargazers_count: int
    updated_at: Optional[datetime] = None
    fork: bool
    private: bool
    visibility: str


class GithubPortfolio(BaseModel):
    profile: GithubProfile
    repositories: list[GithubRepository]