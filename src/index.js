console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", function(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl)
    .then(success => success.json())
    .then(data => {
        const newDiv = document.getElementById("dog-image-container")
        data.message.forEach(image => {
            const newElement = document.createElement("img")
            newElement.src = image
            newDiv.appendChild(newElement)
        });
    });

    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    fetch(breedUrl)
    .then(get => get.json())
    .then(data => {
        const breedList = document.getElementById("dog-breeds");
        const breedFilter = document.getElementById("breed-dropdown");
      if (breedList && breedFilter) {
        const breeds = data.message;
        function filterBreeds(selectedLetter) {
          const filteredBreeds = {};
          for (const breed in breeds) {
            if (breed.charAt(0).toLowerCase() === selectedLetter.toLowerCase()) {
              filteredBreeds[breed] = breeds[breed];
            }
          }
          return filteredBreeds;
        }

        function updateBreedList(filteredBreeds) {
          breedList.innerHTML = ""; 
          for (const breed in filteredBreeds) {
            const listItem = document.createElement("li");
            listItem.addEventListener("click", function () {
                this.style.color = "blue";
            });
            listItem.textContent = breed;
            breedList.appendChild(listItem);
          }
        }
        updateBreedList(breeds);
        breedFilter.addEventListener("change", function () {
          const selectedLetter = this.value; 
          if (selectedLetter === "all") {
            updateBreedList(breeds);
          } else {
            const filteredBreeds = filterBreeds(selectedLetter);
            updateBreedList(filteredBreeds);
          }
        });
      }
    })

})