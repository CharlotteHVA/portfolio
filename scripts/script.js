console.log("hello");

document.addEventListener("DOMContentLoaded", () => {
  let cursorItem = document.querySelector(".cursor");
  let cursorImage = cursorItem.querySelector("img");
  let targets = document.querySelectorAll("[data-cursor]");
  let xOffset = 5;
  let yOffset = 10;
  let cursorIsOnRight = false;
  let currentTarget = null;
  let lastSrc = '';

  gsap.set(cursorItem, { xPercent: xOffset, yPercent: yOffset });
  let xTo = gsap.quickTo(cursorItem, "x", { ease: "power3" });
  let yTo = gsap.quickTo(cursorItem, "y", { ease: "power3" });

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", e => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let scrollY = window.scrollY;
    let cursorX = e.clientX;
    let cursorY = e.clientY + scrollY;

    // Save mouse position for scroll detection
    mouseX = e.clientX;
    mouseY = e.clientY;

    let xPercent = xOffset;
    let yPercent = yOffset;

    if (cursorX > windowWidth * 0.66) {
      cursorIsOnRight = true;
      xPercent = -100;
    } else {
      cursorIsOnRight = false;
    }

    if (cursorY > scrollY + windowHeight * 0.9) {
      yPercent = -120;
    }

    if (currentTarget) {
      let newSrc = currentTarget.getAttribute("data-cursor");
      if (newSrc !== lastSrc) {
        cursorImage.src = newSrc;
        lastSrc = newSrc;
      }
    }

    gsap.to(cursorItem, {
      xPercent: xPercent,
      yPercent: yPercent,
      duration: 0.9,
      ease: "power3"
    });
    xTo(cursorX);
    yTo(cursorY - scrollY);
  });

  targets.forEach(target => {
    target.addEventListener("mouseenter", () => {
      currentTarget = target;
      let newSrc = target.getAttribute("data-cursor");
      if (newSrc !== lastSrc) {
        cursorImage.src = newSrc;
        lastSrc = newSrc;
      }
    });

    target.addEventListener("mouseleave", () => {
      currentTarget = null;
      lastSrc = '';
      cursorImage.src = '';
    });
  });

  // Handle hover on scroll
  window.addEventListener("scroll", () => {
    const elementUnderCursor = document.elementFromPoint(mouseX, mouseY);

    if (elementUnderCursor && elementUnderCursor.hasAttribute("data-cursor")) {
      if (elementUnderCursor !== currentTarget) {
        currentTarget = elementUnderCursor;
        let newSrc = elementUnderCursor.getAttribute("data-cursor");
        if (newSrc !== lastSrc) {
          cursorImage.src = newSrc;
          lastSrc = newSrc;
        }
      }
    } else {
      if (currentTarget) {
        currentTarget = null;
        lastSrc = '';
        cursorImage.src = '';
      }
    }
  });
});
