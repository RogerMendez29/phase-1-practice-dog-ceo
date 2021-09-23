const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const dogImgContainer = document.querySelector("#dog-image-container");
let list = document.querySelector("#dog-breeds");
const dropSelect = document.querySelector("#breed-dropdown");

let alph = "abcdefghijklmnop";
let alphArray = alph.split("");

alphArray.forEach((letter) => {
  let option = document.createElement("option");
  option.setAttribute("value", letter);
  option.textContent = letter;
  dropSelect.append(option);
});

fetch(imgUrl)
  .then((resp) => resp.json())
  .then((dogUrl) => {
    dogUrl.message.forEach((url) => {
      renderDog(url);
    });
  });

function renderDog(url) {
  let image = document.createElement("img");
  image.src = url;
  dogImgContainer.append(image);
}

fetch(breedUrl)
  .then((resp) => resp.json())
  .then((dogBreed) => {
    for (const breed in dogBreed.message) {
      renderDogBreed(breed);
    }
  });

function renderDogBreed(breed) {
  let dogList = document.createElement("li");
  dogList.innerText = breed;
  dogList.className = "dogName";
  list.append(dogList);
}

list.addEventListener("click", (colorChange) => {
  if (colorChange.target.classList.contains("dogName")) {
    colorChange.target.style.color = "blue";
    colorChange.target.style.backgroundColor = "red";
  }
});

dropSelect.addEventListener("change", filterDogNames);

function filterDogNames(event) {
  let breedFilter;
  fetch(breedUrl)
    .then((resp) => resp.json())
    .then((dogBreed) => {
      let dogBreeds = Object.keys(dogBreed.message);
      breedFilter = dogBreeds.filter(function (breed) {
        return breed.startsWith(event.target.value);
      });
      list.innerHTML = "";

      breedFilter.forEach(function (breed) {
        renderDogBreed(breed);
      });
    });
}
