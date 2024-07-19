import "./assets/styles/style.css";
import {
  createImages,
  displayImages,
  setUpElements,
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
setUpElements();
displayImages();
autoScroll();
