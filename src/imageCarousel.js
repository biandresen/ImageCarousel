//IMAGE CAROUSEL
//1. Add image URLs to a list (imageLinkList) to set up the images you want to use in the carousel and call "createImages(list)"
//2. Call setUpElements();
//3. Call displayImages() to start the carousel.
//4. Call autoScroll() to activate the interval of displaying images.
//Tips: Change between nr.1 and nr.2 for changing the direction of the images.
//The size of the carousel can be changed by changing the pixels of the "image-carousel-module" and the rest should change relative to that.

const imageList = []; //List of URLs
const buttonList = []; //List of all the image-select-buttons
let placement = 0; //Says which image from the list that should be displayed where according to displayImages().

export function createImages(imageLinkList) {
  let count = 0;
  imageLinkList.forEach((imageLink) => {
    const image = document.createElement("img");
    image.classList.add("image");
    image.setAttribute("id", count);
    image.classList.add("hide");
    image.src = imageLink;
    imageList.push(image);
    count++;

    image.addEventListener("click", () => {
      window.open(imageLink, "_blank").focus();
    });
  });
}

export function setUpElements() {
  const body = document.body;
  //Create containers
  const imageCarouselModule = document.createElement("div");
  imageCarouselModule.classList.add("image-carousel-module");
  const slideContainer = document.createElement("div");
  slideContainer.classList.add("slide-container");
  const selectContainer = document.createElement("div");
  selectContainer.classList.add("select-container");
  const leftSlide = document.createElement("div");
  leftSlide.classList.add("left-slide", "slides");
  const rightSlide = document.createElement("div");
  rightSlide.classList.add("right-slide", "slides");
  const middleSlide = document.createElement("div");
  middleSlide.classList.add("middle-slide", "slides");

  //Append containers
  body.appendChild(imageCarouselModule);
  imageCarouselModule.append(slideContainer, selectContainer);
  slideContainer.append(leftSlide, middleSlide, rightSlide);

  createArrowButtons(imageCarouselModule);
  createImageButtons(selectContainer);
}

function createArrowButtons(imageCarouselModule) {
  //Create the buttons and icons
  const arrowButtonLeft = document.createElement("button");
  arrowButtonLeft.classList.add("left-arrow", "arrow");
  const leftArrowIcon = document.createElement("i");
  leftArrowIcon.classList.add("fa-solid", "fa-arrow-left", "fa-2xl");
  const arrowButtonRight = document.createElement("button");
  arrowButtonRight.classList.add("right-arrow", "arrow");
  const rightArrowIcon = document.createElement("i");
  rightArrowIcon.classList.add("fa-solid", "fa-arrow-right", "fa-2xl");

  //Append the buttons and icons
  arrowButtonLeft.appendChild(leftArrowIcon);
  arrowButtonRight.appendChild(rightArrowIcon);
  imageCarouselModule.append(arrowButtonLeft, arrowButtonRight);

  //Add event listeners for the buttons
  arrowButtonLeft.addEventListener("click", () => {
    changePosition(1);
  });
  arrowButtonRight.addEventListener("click", () => {
    changePosition(2);
  });
}

function createImageButtons(selectContainer) {
  //Create image select buttons
  for (let i = 0; i < imageList.length; i++) {
    const button = document.createElement("button");
    button.setAttribute("id", i);
    button.classList.add("image-select-button");

    //Append buttons
    selectContainer.appendChild(button);

    //Push button to button list
    buttonList.push(button);

    //Add event listener to each button
    button.addEventListener("click", (event) => {
      const buttonID = event.target.getAttribute("id");
      markButton(buttonID);
      placement = Number(buttonID);
      displayImages();
    });
  }
}

function markButton(id) {
  const ID = id;
  buttonList.forEach((button) => button.classList.remove("active"));
  buttonList[ID].classList.add("active");
}

function changePosition(dir) {
  const direction = dir;
  if (direction === 1 && placement >= -1) {
    placement--;
  } else if (direction === 2 && placement < imageList.length) {
    placement++;
  }
  displayImages();
}

function selectImage(id) {
  const ID = id;
  buttonList.forEach((button) => button.classList.remove("active"));
  buttonList[ID].classList.add("active");
}

export function displayImages() {
  const leftSlide = document.querySelector(".left-slide");
  const rightSlide = document.querySelector(".right-slide");
  const middleSlide = document.querySelector(".middle-slide");

  leftSlide.innerHTML = "";
  rightSlide.innerHTML = "";
  middleSlide.innerHTML = "";

  if (placement === -2) {
    placement = imageList.length - 2;
  } else if (placement === imageList.length - 1) {
    placement = -1;
  }

  if (placement === -1) {
    //Left image
    leftSlide.appendChild(imageList[imageList.length - 1]);
    //Center image
    middleSlide.appendChild(imageList[placement + 1]);
    selectImage(imageList.length - 1);
    //Right image
    rightSlide.appendChild(imageList[placement + 2]);
  } else if (placement > -1 && placement < imageList.length - 2) {
    //Left image
    leftSlide.appendChild(imageList[placement]);
    //Center image
    middleSlide.appendChild(imageList[placement + 1]);
    selectImage(placement);
    //Right image
    rightSlide.appendChild(imageList[placement + 2]);
  } else if (placement === imageList.length - 2) {
    //Left image
    leftSlide.appendChild(imageList[placement]);
    //Center image
    middleSlide.appendChild(imageList[placement + 1]);
    selectImage(imageList.length - 2);
    //Right image
    rightSlide.appendChild(imageList[0]);
  }
}

export function autoScroll() {
  setInterval(() => {
    changePosition(2);
  }, 5000);
}

//EXAMPLE of HTML:
// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Image Carousel</title>
//     <link
//       rel="stylesheet"
//       href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
//       integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
//       crossorigin="anonymous"
//       referrerpolicy="no-referrer"
//     />
//   </head>
//   <body></body>
// </html>

//CSS:
// .image-carousel-module {
//   position: relative;
//   height: 700px;
//   width: 1700px;
//   background: transparent;
//   box-shadow: var(--shadow);
//   display: grid;
//   place-content: center;
//   border-radius: 10px;
// }
// .slide-container {
//   height: 100%;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 5px;
// }
// .slides {
//   display: flex;
//   place-content: center;
// }
// .left-slide,
// .right-slide {
//   transform: scale(0.9);
//   height: 100%;
//   width: 23%;
//   opacity: 30%;
// }
// .middle-slide {
//   display: flex;
//   place-content: center;
//   max-height: 100%;
//   max-width: 45%;
//   box-shadow: var(--shadow);
// }
// .arrow {
//   position: absolute;
//   width: fit-content;
//   height: fit-content;
//   color: var(--text-color);
//   background: transparent;
//   border: transparent;
//   border-radius: 50%;
//   cursor: pointer;
//   transition: 0.4s;
// }
// .arrow:hover {
//   transform: scale(1.2);
//   transition: 0.4s;
// }
// .left-arrow {
//   top: 50%;
//   left: 0.8%;
// }
// .right-arrow {
//   top: 50%;
//   right: 0.8%;
// }
// .select-container {
//   position: absolute;
//   display: flex;
//   gap: 10px;
//   bottom: 4%;
//   left: 50%;
//   translate: -50%;
// }
// .image-select-button {
//   width: 12px;
//   height: 12px;
//   border: 2px solid var(--text-color);
//   background: transparent;
//   border-radius: 50%;
//   cursor: pointer;
//   transition: 0.3s;
// }
// .image-select-button:hover {
//   transform: scale(1.2);
//   transition: 0.3s;
// }
// .image-select-button.active {
//   background: transparent;
//   border: 3px solid var(--text-color);
//   transform: scale(1.3);
// }
// .image {
//   height: 100%;
//   width: 100%;
//   border-radius: 5px;
// }
