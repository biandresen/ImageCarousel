const imageList = [];
const buttonList = [];
let placement = 0;

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
