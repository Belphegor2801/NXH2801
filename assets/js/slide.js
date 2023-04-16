const carousel = document.querySelector(".portfolio-carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".portfolio-wrapper i");
dots = document.querySelectorAll(".portfolio-dot");
slideIndex = 1;
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        slideIndex += icon.id == "left" ? -1 : 1;
        portfolio_setSlideIndex();
    });
});

const portfolio_setSlideIndex = () => {
    if (slideIndex > dots.length) {slideIndex = dots.length};
    if (slideIndex < 1) {slideIndex = 1};

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" portfolio-dot-active", "");
    }
    dots[slideIndex-1].className += " portfolio-dot-active";
}

function currentSlide(n){
    slideIndex = n;
    portfolio_setSlideIndex();
    toSlide();
}

const toSlide = () =>{
    carousel.scrollLeft = (carousel.clientWidth + 14) * (slideIndex - 1);
}

const portfolio_autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;
    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        slideIndex += 1;
        portfolio_setSlideIndex();
        return carousel.scrollLeft += positionDiff > firstImgWidth / 5 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    slideIndex -= 1;
    portfolio_setSlideIndex();
    carousel.scrollLeft -= positionDiff > firstImgWidth / 5 ? valDifference : -positionDiff;
}
const portfolio_dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const portfolio_dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
}
const portfolio_dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    portfolio_autoSlide();
}
carousel.addEventListener("mousedown", portfolio_dragStart);
carousel.addEventListener("touchstart", portfolio_dragStart);
document.addEventListener("mousemove", portfolio_dragging);
carousel.addEventListener("touchmove", portfolio_dragging);
document.addEventListener("mouseup", portfolio_dragStop);
carousel.addEventListener("touchend", portfolio_dragStop);