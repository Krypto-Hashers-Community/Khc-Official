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


// stats memeber information
async function getAllMembers(org) {
  let page = 1;
  const perPage = 100;
  let allMembers = [];
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`https://api.github.com/orgs/${org}/members?per_page=${perPage}&page=${page}`);
    const members = await response.json();

    if (members.length === 0 || response.status !== 200) {
      hasMore = false;
    } else {
      allMembers = allMembers.concat(members);
      page++;
    }
  }

  return allMembers;
}

async function loadMembers() {
  const loader = document.getElementById('member-loader');
  const cardsContainer = document.getElementById('member-cards');

  try {
    const members = await getAllMembers('Krypto-Hashers-Community');
    loader.style.display = 'none';

    members.forEach(member => {
      const card = document.createElement('div');
      card.className = 'member-card';

      card.innerHTML = `
        <img src="${member.avatar_url}" alt="${member.login}" class="avatar" />
        <div class="member-name">${member.login}</div>
      `;

      cardsContainer.appendChild(card);
    });
  } catch (error) {
    loader.textContent = 'Failed to load members.';
    console.error('Error:', error);
  }
}

loadMembers();

// toggle members button
const toggleBtn = document.getElementById('toggle-see-all-btn');
const memberContainer = document.getElementById('member-cards');

toggleBtn.addEventListener('click', () => {
  const expanded = memberContainer.classList.toggle('expanded');
  toggleBtn.textContent = expanded ? 'Collapse' : 'See All Members';
});