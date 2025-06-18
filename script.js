const backendApiUrl = "/api/github-data";

const starsCountElement = document.getElementById("stars-count");
const forksCountElement = document.getElementById("forks-count");
const membersCountElement = document.getElementById("members-count");
const communityStatsElement = document.getElementById(
  "community-stats-section"
); // For fallback message

fetch(backendApiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response from backend was not OK");
    }
    return response.json();
  })
  .then((data) => {
    const { totalStars, totalForks, totalMembers } = data;

    starsCountElement.textContent = data.totalStars;
    forksCountElement.textContent = data.totalForks;
    membersCountElement.textContent = data.totalMembers;
  })
  .catch((error) => {
    console.error("Error fetching data from backend:", error);

    // Fallback UI if error happens
    if (communityStatsElement) {
      communityStatsElement.innerText =
        "Community stats are temporarily unavailable. Please try again later!";
    }
  });

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.innerHTML = navMenu.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Get the target element's ID (e.g., #our-story)
    const targetElement = document.querySelector(this.getAttribute("href"));

    // Set a delay (in milliseconds)
    const delay = 500; // Delay in ms (500ms = 0.5 seconds)

    // Use setTimeout to add the delay before scrolling
    setTimeout(() => {
      // Smooth scroll to the target element
      targetElement.scrollIntoView({
        behavior: "smooth", // smooth scrolling
        block: "start", // scroll to the top of the element
      });
    }, delay);
  });
});
