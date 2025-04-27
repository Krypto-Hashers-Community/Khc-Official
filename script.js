const backendApiUrl = "https://github-api-backend.vercel.app/api/github-data";

const starsCountElement = document.getElementById("stars-count");
const forksCountElement = document.getElementById("forks-count");
const membersCountElement = document.getElementById("members-count");
const communityStatsElement = document.getElementById("community-stats-section"); // For fallback message

fetch(backendApiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response from backend was not OK");
        }
        return response.json();
    })
    .then(data => {
        const { totalStars, totalForks, totalMembers } = data;

        starsCountElement.textContent = data.totalStars;
        forksCountElement.textContent = data.totalForks;
        membersCountElement.textContent = data.totalMembers;
    })
    .catch(error => {
        console.error("Error fetching data from backend:", error);

        // Fallback UI if error happens
        if (communityStatsElement) {
            communityStatsElement.innerText = 'Community stats are temporarily unavailable. Please try again later!';
        }
    });
