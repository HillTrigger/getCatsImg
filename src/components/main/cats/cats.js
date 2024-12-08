const button = document.querySelector(".cats__btn");
const image = document.querySelector(".cats__image");
const url = "https://api.thecatapi.com/v1/images/search";

async function getImage() {
  // return fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => data[0].url)
  //   .catch((err) => err);
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data[0].url;
  } catch (error) {
    return error;
  }
}

async function changeImage() {
  button.disabled = true;
  const newImage = await getImage();
  if (newImage instanceof Error) {
    button.disabled = false;
    return null;
  }
  image.src = newImage;
  console.log("Update Image");
  return null;
}

button.addEventListener("click", changeImage);
image.addEventListener("load", () => (button.disabled = false));
