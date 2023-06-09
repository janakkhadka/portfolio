window.onscroll=()=>{
let header=document.querySelector('.header');

header.classList.toggle('sticky',window.scrollY>100);
}

//gallery section

const galleryBox = document.querySelector(".gallery-box"),
firstImg = galleryBox.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".gallery-container i");
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
const showHideIcons = () => {
    // showing and hiding prev/next icon according to galleryBox scroll left value
    let scrollWidth = galleryBox.scrollWidth - galleryBox.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = galleryBox.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = galleryBox.scrollLeft == scrollWidth ? "none" : "block";
}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the galleryBox scroll left else add to it
        galleryBox.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});
const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(galleryBox.scrollLeft - (galleryBox.scrollWidth - galleryBox.clientWidth) > -1 || galleryBox.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from galleryBox left to take middle img center
    let valDifference = firstImgWidth - positionDiff;
    if(galleryBox.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return galleryBox.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    galleryBox.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}
const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = galleryBox.scrollLeft;
}
const dragging = (e) => {
    // scrolling images/galleryBox to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    galleryBox.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    galleryBox.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}
const dragStop = () => {
    isDragStart = false;
    galleryBox.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}
galleryBox.addEventListener("mousedown", dragStart);
galleryBox.addEventListener("touchstart", dragStart);
document.addEventListener("mousemove", dragging);
galleryBox.addEventListener("touchmove", dragging);
document.addEventListener("mouseup", dragStop);
galleryBox.addEventListener("touchend", dragStop);
//gallery end

