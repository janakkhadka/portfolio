
//menu icon
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};





//scroll section

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll=()=>{
    sections.forEach(sec=>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+id+']').classList.add('active');
            });
        };
    })

//sticky navbar
    let header=document.querySelector('.header');
    header.classList.toggle('sticky',window.scrollY>100);

    //remove menu icon when click navbar link(scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
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

//dark/light mode
let darkModeIcon = document.querySelector('#darkMode-icon');
darkModeIcon.onclick = () =>{
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('darkMode')
}; 

