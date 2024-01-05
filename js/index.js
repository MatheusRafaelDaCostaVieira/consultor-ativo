// The document element
const documentElement = $(document);
// The browser window
const broserWindow = $(window);
// html page body
const body = $("body");
/* Detect user device animation settings */
const userAnimationSettings = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);
// Elements that will be animate when the pages get loaded
const hideBeforeLoad = $(".hide-before-load");
// Navbar reference
const navbar = $(".navbar");
// Menu section
const menuSideBar = $("#menu");
// Menu side bar
const menuContent = $(".menu-container");
// Menu hamburguer icon
const menuBtn = $(".menu-button");
// Menu and navbar links
const navigationLink = $(".navigation-link");
// Menu cards
const aboutCard = $(".about-card");
// This is the sing up pop up blur div.
const popUpDiv = $(".pop-up-div");
// Pop up itself
const singUpPopUp = $(".sing-up-pop-up");
// The pop up paragraph.
const popUpP = $(".pop-up-p");
// The terms of service div.
const termsOfService = $(".terms-of-service");

// When the page gets loaded, these codes will get execulted.
$(document).ready(function () {
  setAnimations();
  checkUserTheme();
  changeIconsColor();
  animationAfterLoad();
  activeNavbar();
  scrollAnimation();

  // Call functions when user clicks at the page
  body.on("click", function (e) {
    menuClickCheck(e.target);
    aboutCardClickCheck(e.target);
  });

  // And when the menu link get clicked
  navigationLink.on("click", function () {
    closeMenu();
  });

  // Hides the menu if the screen is bigger than 900px wide
  broserWindow.on("resize", function () {
    if (broserWindow.innerWidth() > 900) {
      closeMenu();
    }
  });

  // Actives when user scrolls
  documentElement.on("scroll", function () {
    activeNavbar();
  });

  // Calls the function that adds the hover class when the user hovers and/or clicks on the card
  aboutCard.on("click", function (event) {
    /* Gets the card that was clicked */
    clickedAboutCard = event.currentTarget;

    /* Check if the card has the hover class */
    if (clickedAboutCard.classList.contains("about-card-hover")) {
      /* Remove the class */
      clickedAboutCard.classList.remove("about-card-hover");
    } else {
      /* Remove the class of the active card - and from all of them */
      aboutCard.removeClass("about-card-hover");

      /* Adds the class to the clicked card */
      clickedAboutCard.classList.add("about-card-hover");
    }
  });

  // If the card was cliked in a desktop, this eventListener prevents it to
  // stays in hovered state if it was cliked while hovered
  aboutCard.on("mouseleave", function (event) {
    event.currentTarget.classList.remove("about-card-hover");
  });

  // Call the scroll animation function when user scrolls
  window.addEventListener("scroll", scrollAnimation);
});

// After the page got loaded, animate elements with class hide-before-load
function animationAfterLoad() {
  hideBeforeLoad.addClass("animation-after-load");
}

// Check users's color theme
function checkUserTheme() {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", changeIconsColor);
}

// Changes the icon according to the user's theme
function changeIconsColor() {
  const userTheme = window.matchMedia("(prefers-color-scheme: dark)");

  if (userTheme.matches) {
    $(".plan-p .responsive-icon").attr("src", "./images/icons/light-check.svg");
    $(".plan-button-responsive-icon img").attr(
      "src",
      "./images/icons/light-plan-btn.svg"
    );
    $(".close-pop-up-icon").attr("src", "../images/icons/close-light.svg");
  } else {
    $(".plan-p .responsive-icon").attr("src", "./images/icons/dark-check.svg");
    $(".plan-button-responsive-icon img").attr(
      "src",
      "./images/icons/dark-plan-btn.svg"
    );
    $(".close-pop-up-icon").attr("src", "../images/icons/close-dark.svg");
  }
}

// If scroolTop is more than 0, adds active-navbar and active-navbar-menu classes
function activeNavbar() {
  if ($(document).scrollTop() > 0 || body.scrollTop() > 0) {
    navbar.addClass("active-navbar");
    menuContent.addClass("active-navbar-menu");
  } else {
    /* If it's not (so it's zero) remove them */
    navbar.removeClass("active-navbar");
    menuContent.removeClass("active-navbar-menu");
  }
}

// Animates elements with class scroll-animation
function scrollAnimation() {
  let scrollAnimationElement = document.querySelectorAll(".scroll-animation");

  for (let i = 0; i < scrollAnimationElement.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = scrollAnimationElement[i].getBoundingClientRect().top;
    let elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      scrollAnimationElement[i].classList.add("active");
    } else {
      scrollAnimationElement[i].classList.remove("active");
    }
  }
}

// Toggle the menu between open and closed
function toggleMenu() {
  body.toggleClass("block-scroll");
  menuSideBar.toggleClass("active-menu");
  navbar.toggleClass("active-menu-navbar");
}

// Close the menu, remove navbar white background and unblock the page's scroll
function closeMenu() {
  body.removeClass("block-scroll");
  menuSideBar.removeClass("active-menu");
  navbar.removeClass("active-menu-navbar");
}

// Checks if user is clicking out of the menu
// if yes, the menu gets closed
function menuClickCheck(clickedItem) {
  if (menuSideBar.hasClass("active-menu")) {
    if (
      !menuSideBar[0].contains(clickedItem) &&
      !menuBtn[0].contains(clickedItem)
    ) {
      closeMenu();
    }
  }
}

// Checks if user is clicking out of the about cards
// if yes, the cards get back to the normal.
function aboutCardClickCheck(clickedItem) {
  for (let card of aboutCard) {
    if (!card.contains(clickedItem)) {
      card.classList.remove("about-card-hover");
    }
  }
}

// Makes the pop up appear when user sings up
function togglePopUp() {
  if (singUpPopUp.hasClass("active")) {
    singUpPopUp.removeClass("active");
  } else {
    singUpPopUp.addClass("active");
  }
}

// Display the terms of service
function openTermsOfService() {
  popUpDiv.css("--expanded-height", "calc(100% - 160px)");
  popUpDiv.css("--expanded-width", "100%");

  popUpDiv.addClass("expanded");
  termsOfService.addClass("active");
  popUpP.removeClass("active");
}

// Hides the terms of service
function closeTermsOfService() {
  setTimeout(() => {
    popUpDiv.removeClass("expanded");
    termsOfService.removeClass("active");
    popUpP.addClass("active");
  }, 300);
}

// Turn on/off animations according to user's settings
function setAnimations() {
  if (userAnimationSettings.matches) {
    $(":root").css("--transition", "linear");
  }
}
