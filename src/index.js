import "./assets/styles/style.css";
import {
  createImages,
  displayImages,
  changePosition,
  createImageButtons,
  autoScroll,
} from "./imageCarousel";

const imageLocations = [
  "./assets/images/img1.jpg",
  "./assets/images/img2.jpg",
  "./assets/images/img3.jpg",
  "./assets/images/img4.jpg",
  "./assets/images/img5.jpg",
  "./assets/images/img6.jpg",
];
createImages(imageLocations);
createImageButtons();
displayImages();
autoScroll();

const leftArrow = document.querySelector("#left");
const rightArrow = document.querySelector("#right");

leftArrow.addEventListener("click", () => {
  changePosition(1);
  displayImages();
});

rightArrow.addEventListener("click", () => {
  changePosition(2);
  displayImages();
});
