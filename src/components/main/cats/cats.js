const button = document.querySelector(".cats__btn");
const image = document.querySelector(".cats__image");
const url = "https://api.thecatapi.com/v1/images/search";
let timeout = null;

async function getImage() {
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
  timeout = setTimeout(() => {
    if (!image.complete) {
      button.disabled = false;
      console.error("Изображение не загрузилось вовремя.");
    }
  }, 5000);
  return null;
}

button.addEventListener("click", changeImage);

image.addEventListener("load", () => {
  clearTimeout(timeout);
  button.disabled = false;
  console.log("Изображение загружено успешно.");
});
