const slideLeft = document.querySelector("#slide-left");
const slideRight = document.querySelector("#slide-right");
const display = document.querySelector("#display");
const imageList = [];
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

export function createImageButtons(){
  
}

export function changePosition(dir) {
  const direction = dir;
  if (direction === 1 && placement >= -1) {
    placement--;
  } else if (direction === 2 && placement < imageList.length) {
    placement++;
  }

  if (placement === -2) {
    placement = imageList.length - 2;
  } else if (placement === imageList.length - 1) {
    placement = -1;
  }
}

export function displayImages() {
  slideLeft.innerHTML = "";
  slideRight.innerHTML = "";
  if (placement === -1) {
    //Left image
    slideLeft.appendChild(imageList[imageList.length - 1]);
    //Center image
    display.appendChild(imageList[placement + 1]);
    //Right image
    slideRight.appendChild(imageList[placement + 2]);
  } else if (placement > -1 && placement < imageList.length - 2) {
    //Left image
    slideLeft.appendChild(imageList[placement]);
    //Center image
    display.appendChild(imageList[placement + 1]);
    //Right image
    slideRight.appendChild(imageList[placement + 2]);
  } else if (placement === imageList.length - 2) {
    //Left image
    slideLeft.appendChild(imageList[placement]);
    //Center image
    display.appendChild(imageList[placement + 1]);
    //Right image
    slideRight.appendChild(imageList[0]);
  }
}
