var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    speed: 1500,
    cssMode: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        waitForTransition: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});





