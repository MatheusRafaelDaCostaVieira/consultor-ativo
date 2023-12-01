/* Execute the code after the page is fully loaded */
$(document).ready(function() {

    /* And when the menu link get clicked */
    $(".menu-links .navigation-link").on("click", function() {
        
        /* Hide menu */
        $("#menu").hide()

    })

    /* Hides the menu if the screen is bigger than 900px wide */
    $(window).on("resize", function() {
        
        if(screen.width > 900) {   
            /* Hide menu */
            $("#menu").hide()
        }

    })

    $(document).on("scroll", function() {

        if($(document).scrollTop() > 0 || $("body").scrollTop() > 0) {
            
            $(".navbar").addClass("active-navbar")

        } else {

            $(".navbar").removeClass("active-navbar")

        }
    })

    /* Calls the function that adds the hover class when the user hovers and/or clicks on the card */
    $(".about-card").on("click", function(event) {
        
        /* Gets the card that was clicked */
        clickedAboutCard = event.currentTarget

        /* Check if the card has the hover class */
        if(clickedAboutCard.classList.contains("about-card-hover")) {

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
    $(".about-card").on("mouseleave", function(event) {
        
        event.currentTarget.classList.remove("about-card-hover")

    })

})

/* When menu button gets cliked */
function menuOpenClose() {
    $("#menu").toggle()
}