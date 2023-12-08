$(document).ready(function () {
    /* And when the menu link get clicked */
    $(".menu-links .navigation-link").on("click", function () {
        closeMenu()
    })

    /* Hides the menu if the screen is bigger than 900px wide */
    $(window).on("resize", function () {

        if (screen.width > 900) {
            closeMenu()
        }

    })

    /* Actives when user scrolls */
    $(document).on("scroll", function () {

        /* If scroolTop is over 0, add active-navbar and active-navbar-menu classes. */
        if ($(document).scrollTop() > 0 || $("body").scrollTop() > 0) {

            $(".navbar").addClass("active-navbar")
            $(".menu-container").addClass("active-navbar-menu")

        } else {

            /* If it's 0, then remove them */
            $(".navbar").removeClass("active-navbar")
            $(".menu-container").removeClass("active-navbar-menu")
        }
    })

    /* Calls the function that adds the hover class when the user hovers and/or clicks on the card */
    $(".about-card").on("click", function (event) {

        /* Gets the card that was clicked */
        clickedAboutCard = event.currentTarget

        /* Check if the card has the hover class */
        if (clickedAboutCard.classList.contains("about-card-hover")) {

            /* Remove the class */
            clickedAboutCard.classList.remove("about-card-hover")

        } else {

            /* Remove the class of the active card - and from all of them */
            $(".about-card").removeClass("about-card-hover")

            /* Adds the class to the clicked card */
            clickedAboutCard.classList.add("about-card-hover")

        }

    })

    /* If the card was cliked in a desktop, this eventListener prevents it to stays in hovered state if it was cliked while hovered */
    $(".about-card").on("mouseleave", function (event) {

        event.currentTarget.classList.remove("about-card-hover")

    })

    $("body").on("click", function (e) {

        var menu = document.querySelector("#menu")
        var menuBtn = document.querySelector(".menu-button")

        if (menu.classList.contains("active-menu")) {
            if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {

                closeMenu()

            }
        }



    })

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", changeIconsColor)

})

/* Change the icon according to the user's theme */
function changeIconsColor() {
    const userTheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (userTheme.matches) {
        $(".plan-p .responsive-icon").attr("src", "./images/icons/light-check.svg")
        $(".plan-button-responsive-icon img").attr("src", "./images/icons/light-plan-btn.svg")
    } else {
        $(".plan-p .responsive-icon").attr("src", "./images/icons/dark-check.svg")
        $(".plan-button-responsive-icon img").attr("src", "./images/icons/dark-plan-btn.svg")
    }

}

function toggleMenu() {
    $("body").toggleClass("block-scroll")
    $("#menu").toggleClass("active-menu")
    $(".navbar").toggleClass("active-menu-navbar")
}


function openMenu() {
    $("body").addClass("block-scroll")
    $("#menu").addClass("active-menu")
    $(".navbar").addClass("active-menu-navbar")
}

/* Close the menu, remove navbar white background and unblock the page's scroll */
function closeMenu() {
    $("body").removeClass("block-scroll")
    $("#menu").removeClass("active-menu")
    $(".navbar").removeClass("active-menu-navbar")
}

changeIconsColor() 