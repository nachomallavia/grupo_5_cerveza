window.addEventListener("load", function(event) {
    var slideIndex = 1;
    showSlides(slideIndex);

    let prevArrow = document.getElementById("prevBanner");
    let nextArrow = document.getElementById("nextBanner");
    
    var slides = document.getElementsByClassName("banner");
    var dots = document.getElementsByClassName("dot");

    for (dot of dots){
        let index = dot.getAttribute('data-index');
        dot.addEventListener("click",function(){
            currentSlide(index);
        })
    }
    
    prevArrow.addEventListener("click",function(){
        showSlides(slideIndex -= 1);
    })
    nextArrow.addEventListener("click",function(){
        showSlides(slideIndex += 1);
    })

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        /* We refer to the elements with the class name "item", that is, to the pictures: */
        let slides = document.getElementsByClassName("banner");
        let slidesMobile = document.getElementsByClassName("bannerMobile");
        
        /* Checking the number of slides: */
        if (n > slides.length) {
          slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
      
        /* Loop through each slide in a for loop: */
        for (let slide of slides) {
            slide.style.display = "none";
        }
        for (let slide of slidesMobile) {
            slide.style.display = "none";
        }
        /* Making an element block: */
        slides[slideIndex - 1].style.display = "block";
        slidesMobile[slideIndex - 1].style.display = "block";
        
        console.log(slideIndex);
    }

    
})
