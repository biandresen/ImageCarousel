const slideLeft = document.querySelector("#slide-left");
const slideRight = document.querySelector("#slide-right");
const display = document.querySelector("#display");
const imageList = [];
const buttonList = [];
let placement = 0;

export function createImages(imageLocations) {
  let count = 0;
  imageLocations.forEach((imageLocation) => {
    const image = document.createElement("img");
    image.classList.add("image");
    image.setAttribute("id", count);
    image.classList.add("hide");
    image.src = imageLocation;
    imageList.push(image);
    count++;
  });
}

function createContainers() {
  const container = document.querySelector(".container");
  const selectContainer = document.createElement("div");
  selectContainer.classList.add("select-container");
  container.appendChild(selectContainer);
}

function createArrowButtons(selectContainer) {
  //Create the buttons and icons
  const arrowButtonLeft = document.createElement("button");
  arrowButtonLeft.classList.add("left-arrow", "arrow");
  const leftArrowIcon = document.createElement("i");
  leftArrowIcon.classList.add("fa-solid", "fa-circle-arrow-left", "fa-2xl");
  const arrowButtonRight = document.createElement("button");
  arrowButtonRight.classList.add("right-arrow", "arrow");
  const rightArrowIcon = document.createElement("i");
  rightArrowIcon.classList.add("fa-solid", "fa-circle-arrow-right", "fa-2xl");

  //Append the buttons and icons
  arrowButtonLeft.appendChild(leftArrowIcon);
  arrowButtonRight.appendChild(rightArrowIcon);
  selectContainer.append(arrowButtonLeft, arrowButtonRight);

  //Add event listeners for the buttons
  arrowButtonLeft.addEventListener("click", () => {
    changePosition(1);
  });
  arrowButtonRight.addEventListener("click", () => {
    changePosition(2);
  });
}

export function createImageButtons(selectContainer) {
  //Create image select buttons
  for (let i = 0; i < imageList.length; i++) {
    const button = document.createElement("button");
    button.setAttribute("id", i);
    button.classList.add("image-select");

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

export function changePosition(dir) {
  const direction = dir;
  if (direction === 1 && placement >= -1) {
    placement--;
  } else if (direction === 2 && placement < imageList.length) {
    placement++;
  }
  displayImages();
}

export function displayImages() {
  slideLeft.innerHTML = "";
  slideRight.innerHTML = "";
  display.innerHTML = "";

  if (placement === -2) {
    placement = imageList.length - 2;
  } else if (placement === imageList.length - 1) {
    placement = -1;
  }

  if (placement === -1) {
    //Left image
    slideLeft.appendChild(imageList[imageList.length - 1]);
    //Center image
    display.appendChild(imageList[placement + 1]);
    selectImage(imageList.length - 1);
    //Right image
    slideRight.appendChild(imageList[placement + 2]);
  } else if (placement > -1 && placement < imageList.length - 2) {
    //Left image
    slideLeft.appendChild(imageList[placement]);
    //Center image
    display.appendChild(imageList[placement + 1]);
    selectImage(placement);
    //Right image
    slideRight.appendChild(imageList[placement + 2]);
  } else if (placement === imageList.length - 2) {
    //Left image
    slideLeft.appendChild(imageList[placement]);
    //Center image
    display.appendChild(imageList[placement + 1]);
    selectImage(imageList.length - 2);
    //Right image
    slideRight.appendChild(imageList[0]);
  }
}

export function autoScroll() {
  setInterval(() => {
    changePosition(2);
  }, 5000);
}
