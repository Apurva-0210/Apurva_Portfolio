from fastapi import APIRouter, HTTPException
import httpx

from models.github import GithubPortfolio, GithubProfile, GithubRepository


router = APIRouter(prefix="/github", tags=["github"])

GITHUB_USERNAME = "Apurva-0210"
GITHUB_API = "https://api.github.com"
GITHUB_HEADERS = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
}


@router.get("/portfolio", response_model=GithubPortfolio)
async def get_github_portfolio():
    try:
        async with httpx.AsyncClient(timeout=10.0, headers=GITHUB_HEADERS) as client:
            profile_response, repositories_response = await client.get(
                f"{GITHUB_API}/users/{GITHUB_USERNAME}"
            ), await client.get(
                f"{GITHUB_API}/users/{GITHUB_USERNAME}/repos",
                params={"type": "owner", "sort": "updated", "direction": "desc", "per_page": 100},
            )
    except httpx.HTTPError as error:
        raise HTTPException(status_code=502, detail="GitHub is temporarily unavailable") from error

    if profile_response.status_code != 200 or repositories_response.status_code != 200:
        raise HTTPException(status_code=502, detail="GitHub is temporarily unavailable")

    try:
        profile_payload = profile_response.json()
        repositories_payload = repositories_response.json()
        profile = GithubProfile(
            login=profile_payload["login"],
            name=profile_payload.get("name"),
            bio=profile_payload.get("bio"),
            avatar_url=profile_payload["avatar_url"],
            html_url=profile_payload["html_url"],
            public_repos=profile_payload["public_repos"],
        )
        repositories = [
            GithubRepository(
                id=repository["id"],
                name=repository["name"],
                full_name=repository["full_name"],
                html_url=repository["html_url"],
                description=repository.get("description"),
                language=repository.get("language"),
                stargazers_count=repository["stargazers_count"],
                updated_at=repository.get("updated_at"),
                fork=repository["fork"],
                private=repository["private"],
                visibility=repository.get("visibility", "public"),
            )
            for repository in repositories_payload
            if not repository.get("private") and not repository.get("fork") and repository.get("visibility") == "public"
        ]
    except (KeyError, TypeError, ValueError) as error:
        raise HTTPException(status_code=502, detail="GitHub returned an unexpected response") from error

    return GithubPortfolio(profile=profile, repositories=repositories)