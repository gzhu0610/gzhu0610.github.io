const revealItems = document.querySelectorAll(".reveal");
const sectionLinks = document.querySelectorAll("[data-section-link]");
const sections = document.querySelectorAll("main section[id]");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const navObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      const id = visible.target.id;
      sectionLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.sectionLink === id);
      });
    },
    {
      threshold: 0.45,
      rootMargin: "-20% 0px -45% 0px",
    }
  );

  sections.forEach((section) => navObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
