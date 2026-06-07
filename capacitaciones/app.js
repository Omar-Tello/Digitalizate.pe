const menuIcon = document.querySelector(".menu-icon");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const mobileMenuPanel = document.getElementById("mobileMenuPanel");
const closeMenuBtn = document.getElementById("closeMenuBtn");
console.log("&Toc on codepen - https://codepen.io/ol-ivier");

function openMobileMenu() {
	mobileMenuOverlay.classList.add("active");
	mobileMenuPanel.classList.add("active");
	document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
	mobileMenuOverlay.classList.remove("active");
	mobileMenuPanel.classList.remove("active");
	document.body.style.overflow = "";
}

menuIcon.addEventListener("click", openMobileMenu);
closeMenuBtn.addEventListener("click", closeMobileMenu);
mobileMenuOverlay.addEventListener("click", closeMobileMenu);

const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links a");
mobileMenuLinks.forEach((link) => {
	link.addEventListener("click", () => {
		closeMobileMenu();
	});
});

const allMenuLinks = document.querySelectorAll(
	".nav-links a, .mobile-menu-links a"
);
allMenuLinks.forEach((link) => {
	link.addEventListener("click", (e) => {
		e.preventDefault();
		const menuText = link.textContent.trim();
		document.querySelectorAll(".nav-links a").forEach((navLink) => {
			if (navLink.textContent.trim() === menuText) {
				navLink.classList.add("active");
			} else {
				navLink.classList.remove("active");
			}
		});
		document.querySelectorAll(".mobile-menu-links a").forEach((mobileLink) => {
			if (mobileLink.textContent.trim() === menuText) {
				mobileLink.classList.add("active");
			} else {
				mobileLink.classList.remove("active");
			}
		});
	});
});

const allHiddenArticles = document.querySelectorAll(
	"#additionalArticlesContainer .news-card"
);
const batches = [[], [], []];
allHiddenArticles.forEach((article) => {
	const batchIndex = parseInt(article.getAttribute("data-batch"));
	if (batchIndex >= 0 && batchIndex < 3) {
		batches[batchIndex].push(article.cloneNode(true));
	}
});

let clickCount = 0;
const maxClicks = 3;
const container = document.getElementById("loadedCardsContainer");
const loadBtn = document.getElementById("loadMoreBtn");

function createCard(articleElement, index) {
	const cardDiv = articleElement;
	cardDiv.className = "news-card new-card";
	cardDiv.style.animationDelay = `${index * 0.05}s`;
	return cardDiv;
}

function loadNextBatch() {
	if (clickCount >= maxClicks) {
		loadBtn.disabled = true;
		loadBtn.textContent = "End - Thank you";
		return;
	}
	const articlesToLoad = batches[clickCount];
	if (!articlesToLoad || articlesToLoad.length === 0) {
		loadBtn.disabled = true;
		loadBtn.textContent = "⚠️ NO MORE NEWS";
		return;
	}
	articlesToLoad.forEach((articleElement, idx) => {
		const cardElement = createCard(articleElement, idx);
		container.appendChild(cardElement);
	});
	clickCount++;
	const remaining = maxClicks - clickCount;
	if (remaining === 0) {
		loadBtn.textContent = "No more...";
		loadBtn.disabled = true;
	} else if (remaining === 1) {
		loadBtn.textContent = "More...";
	} else if (remaining === 2) {
		loadBtn.textContent = "More...";
	} else {
		loadBtn.textContent = "More...";
	}
	if (clickCount === 1 && container.firstChild) {
		container.firstChild.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
}

loadBtn.addEventListener("click", loadNextBatch);
