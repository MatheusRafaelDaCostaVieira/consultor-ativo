let popUpDiv = $(".pop-up-div");
let popUpP = $(".pop-up-p");
let termsOfService = $(".terms-of-service");

$(document).ready(function () {
  /* And when the menu link get clicked */
  $(".menu-links .navigation-link").on("click", function () {
    closeMenu();
  });

  /* Hides the menu if the screen is bigger than 900px wide */
  $(window).on("resize", function () {
    if (screen.width > 900) {
      closeMenu();
    }
  });

  /* Actives when user scrolls */
  $(document).on("scroll", function () {
    activeNavbar();
  });

  /* Calls the function that adds the hover class when the user hovers and/or clicks on the card */
  $(".about-card").on("click", function (event) {
    /* Gets the card that was clicked */
    clickedAboutCard = event.currentTarget;

    /* Check if the card has the hover class */
    if (clickedAboutCard.classList.contains("about-card-hover")) {
      /* Remove the class */
      clickedAboutCard.classList.remove("about-card-hover");
    } else {
      /* Remove the class of the active card - and from all of them */
      $(".about-card").removeClass("about-card-hover");

      /* Adds the class to the clicked card */
      clickedAboutCard.classList.add("about-card-hover");
    }
  });

  /* If the card was cliked in a desktop, this eventListener prevents it to stays in hovered state if it was cliked while hovered */
  $(".about-card").on("mouseleave", function (event) {
    event.currentTarget.classList.remove("about-card-hover");
  });

  $("body").on("click", function (e) {
    const menu = document.querySelector("#menu");
    const menuBtn = document.querySelector(".menu-button");

    if (menu.classList.contains("active-menu")) {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMenu();
      }
    }
  });

  /* Detects the user theme to change icons color */
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", changeIconsColor);

  /* Detect user device animation settings */
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (query.matches) {
    $(":root").css("--transition", "linear");
  }

  /* Call the scroll animation function when user scrolls */
  window.addEventListener("scroll", scrollAnimation);

  animationAfterLoad();
  changeIconsColor();
  activeNavbar();
  scrollAnimation();
});

/* Animates elements with the class hide-before-load after load */
function animationAfterLoad() {
  $(".hide-before-load").addClass("animation-after-load");
}

/* Changes the icon according to the user's theme */
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

/* If scroolTop is over 0, adds active-navbar and active-navbar-menu classes */
function activeNavbar() {
  if ($(document).scrollTop() > 0 || $("body").scrollTop() > 0) {
    $(".navbar").addClass("active-navbar");
    $(".menu-container").addClass("active-navbar-menu");
  } else {
    /* If it's 0, then remove them */
    $(".navbar").removeClass("active-navbar");
    $(".menu-container").removeClass("active-navbar-menu");
  }
}

/* Animates elements with class scroll-animation */
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

/* Toggle the menu between open and closed */
function toggleMenu() {
  $("body").toggleClass("block-scroll");
  $("#menu").toggleClass("active-menu");
  $(".navbar").toggleClass("active-menu-navbar");
}

/* Open the menu */
function openMenu() {
  $("body").addClass("block-scroll");
  $("#menu").addClass("active-menu");
  $(".navbar").addClass("active-menu-navbar");
}

/* Close the menu, remove navbar white background and unblock the page's scroll */
function closeMenu() {
  $("body").removeClass("block-scroll");
  $("#menu").removeClass("active-menu");
  $(".navbar").removeClass("active-menu-navbar");
}

/* Makes the pop up appear when user sings up */
function togglePopUp() {
  let popUpWindow = $(".sing-up-pop-up");
  if (popUpWindow.hasClass("active")) {
    popUpWindow.removeClass("active");
  } else {
    popUpWindow.addClass("active");
  }
}

/* Display the terms of service */
function openTermsOfService() {
  /*   let popUpHeight = popUpDiv.css("height");
  popUpHeight = Number(popUpHeight.substring(0, popUpHeight.length - 2));
  popUpHeight = popUpHeight + 120 + "px"; */

  popUpDiv.css("--expanded-height", "calc(100% - 160px)");
  popUpDiv.css("--expanded-width", "100%");

  popUpDiv.addClass("expanded");
  termsOfService.addClass("active");
  popUpP.removeClass("active");
}

/* Hides the terms of service */
function closeTermsOfService() {
  setTimeout(() => {
    popUpDiv.removeClass("expanded");
    termsOfService.removeClass("active");
    popUpP.addClass("active");
  }, 300);
}
