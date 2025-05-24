export default async function handler(req, res) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // From Vercel
    const ORG_NAME = "Krypto-Hashers-Community";

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); 
  
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    };
  
    try {
      // 1. Fetch repositories (public + private)
      const reposResponse = await fetch(`https://api.github.com/user/repos?per_page=100&affiliation=owner,organization_member`, {
        headers,
      });
      const reposData = await reposResponse.json();
  
      if (!Array.isArray(reposData)) {
        throw new Error("Failed to fetch repositories. Check GitHub token permissions.");
      }
  
      // 2. Fetch members (both public and private)
      const membersResponse = await fetch(`https://api.github.com/orgs/${ORG_NAME}/members?per_page=100`, {
        headers,
      });                                                                                   
      const membersData = await membersResponse.json();
  
      if (!Array.isArray(membersData)) {
        throw new Error("Failed to fetch members. Check GitHub token permissions.");
      }
  
      // 3. Calculate total stars and forks for repos belonging to the org
      let totalStars = 0;
      let totalForks = 0;
  
      reposData.forEach((repo) => {
        if (repo.owner.login === ORG_NAME) {
          totalStars += repo.stargazers_count;
          totalForks += repo.forks_count;
        }
      });
  
      res.status(200).json({
        totalStars,
        totalForks,
        totalMembers: membersData.length,
      });
  
    } catch (error) {
      console.error("Error fetching GitHub data:", error.message);
      res.status(500).json({ error: "Failed to fetch GitHub data" });
    }
  }