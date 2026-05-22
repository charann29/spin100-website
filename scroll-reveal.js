document.addEventListener("DOMContentLoaded", () => {
  // 0. LOGO CLICK SMOOTH SCROLL
  const logo = document.querySelector(".navbar-logo");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector("#home");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, null, "#home");
      }
    });
  }

  // 1. SCROLL REVEAL ANIMATIONS (Desktop Only)
  if (window.innerWidth <= 768) {
    // Proactively mark all reveal elements as active on mobile to ensure instant visibility
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
      el.classList.add("active");
    });
  } else {
    const revealCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -100px 0px", // Trigger when element is 100px from entering viewport bottom
      threshold: 0.15                  // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    const targets = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    targets.forEach((target) => {
      observer.observe(target);
    });
  }

  // 2. ACTIVE NAVIGATION HIGHLIGHTS & STORY TRACKER (All screens / Desktop-Only Tracker)
  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks = document.querySelectorAll(".navbar-links a:not(.btn-enquire)");

  function updateActiveLink() {
    let currentSectionId = "";
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    // Check if we are at the bottom of the page
    if ((window.innerHeight + scrollPosition) >= document.documentElement.scrollHeight - 120) {
      currentSectionId = "contact";
    } else {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 180; // offset to trigger slightly early
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute("id");
        }
      });
    }

    if (currentSectionId) {
      // 2a. Update Top Navbar Links
      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${currentSectionId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });


    }
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // Run on mount

  // 3. AUTO-CLOSE MOBILE NAV ON ANCHOR CLICK
  const navbarLinksContainer = document.querySelector(".navbar-links");
  if (navbarLinksContainer) {
    const anchors = navbarLinksContainer.querySelectorAll("a");
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", () => {
        if (navbarLinksContainer.classList.contains("open")) {
          navbarLinksContainer.classList.remove("open");
        }
      });
    });
  }
});
