const perricosArray = [];
const nameDogsArray = ['Luna', 'Walter','Simba','Rocco','Estela', 'Max', 'Bella', 'Rocky', 'Daisy', 'Charlie', 'Bailey', 'Lucy', 'Buddy', 'Cooper', 'Duke', 'Molly', 'Rex', 'Zeus', 'Lola'];

const input = document.getElementById("search");
const selectBreed = document.getElementById('breed-select');
const deletePerritos = document.getElementById('delete-perricos');
let valueBreedSelect;

function updateDisabledState(){
    if (perricosArray.length === 0) {
      selectBreed.classList.add('disabled');
      input.classList.add('disabled');
      deletePerritos.classList.add('hidden');
    } else {
      selectBreed.classList.remove('disabled');
      input.classList.remove('disabled');
      deletePerritos.classList.remove('hidden');
    }
}
updateDisabledState();

/* LLAMADA A LA API DE RAZAS PARA METERLAS EN EL SELECT*/
async function getDogBreeds(){
  const breeds = Object.keys(await getAllBreeds());
  console.log("LO QUE DEVUELVE EL AWAIT:", breeds)
  breeds.forEach(function (breed){
    const option= document.createElement('option');
    option.value = breed;
    option.textContent = breed;
    selectBreed.appendChild(option);
  })
  console.log("Razas de perros:",breeds);
}
getDogBreeds();

selectBreed.addEventListener('change', (event) => {
  valueBreedSelect = event.target.value;
  console.log("valueBreedSelect:", valueBreedSelect);
});

document.querySelector('#dog-list').addEventListener('click', (event) => {
  if (event.target.classList.contains('vote-btn')) {
    handleVote(event);
  }
});

document.querySelector('#add-1-perrico').addEventListener('click', async function () {
  await addPerrico();
  
});

document.querySelector('#add-5-perricos').addEventListener('click', async function(){
  await addPerrico5();
});

input.addEventListener('input',(event)=>{
  searchInput(event.currentTarget.value);
});

const addPerrico = async () => {
  let perricoImg;
  let breed; 
  if(valueBreedSelect){ //hay raza
    perricoImg = await getRandomDogImageByBreed(valueBreedSelect);
    console.log("llamadaaa:",perricoImg )
    breed = valueBreedSelect;
  }else{ //no hay
    perricoImg = await getRandomDogImage();
    breed = perricoImg.split('/breeds/')[1].split('/')[0];
  }
  const dogName = randomDogName(nameDogsArray);
  perricosArray.push({ image: perricoImg, name: dogName, breed: breed, votesPrecioso: Math.floor(Math.random()*100), votesFeisimo: Math.floor(Math.random()*67), voteStatus : null  });
  renderPerricoArray();
  addNamesButtons(dogName);
  updateFilterButtonCounts(); //arreglar
  updateDisabledState();
};
const addPerrico5 = async () => {
  for(let i=0 ; i<=4; i++){
    await addPerrico();
  }
  updateDisabledState();
};
function randomDogName(nameDogsArray){
  const randomIndex = Math.floor(Math.random() * nameDogsArray.length);
  const dogName = nameDogsArray[randomIndex];
  return dogName;
}
function updateFilterButtonCounts() {
  nameDogsArray.forEach(name => {
    const count = perricosArray.filter(dog => dog.name === name).length;
    const btn = document.querySelector(`#${name.toLowerCase()}`);
    if (btn) {
      btn.textContent = `${name} (${count})`;
    }
  });
}
function addNamesButtons(dogName){
  const namesButtonDiv = document.querySelector('.names-button');
  nameDogsArray.forEach(function (nameDog){
    if(nameDog === dogName){
      const html = `<button class='filter-dog' id="${nameDog}">${nameDog}</button>`;
      namesButtonDiv.innerHTML += html;
    }
  });
  addClickEventToNameButton();
}
function addClickEventToNameButton(){
  document.querySelectorAll('.filter-dog').forEach((btn) => {
  btn.addEventListener('click', (event) => {
      const dogNameButton = event.currentTarget.id;
      const isActive = event.currentTarget.classList.toggle('pressed');
      console.log("isActive:",isActive);
      if (isActive) {
        filterDog(dogNameButton); //añadir estilos al toggle
      }else{
        renderPerricoArray();
      }
    });
  });
}
function filterDog(dogNameButton){
  console.log("entramos");
  const dogList = document.querySelector('#dog-list');
  dogList.innerHTML='';
  if(dogNameButton){
    perricosArray.forEach((dog, index) => {
      if(dogNameButton === dog.name){ 
        const precisoPressed = dog.voteStatus === 'precioso' ? 'pressed' : '';
        const feisimoPressed = dog.voteStatus === 'feisimo' ? 'pressed' : '';
        const htmlAdd = `<div class="card">
          <img src="${dog.image}" alt="Perro" />
          <br />
          <p>${dog.name}</p>
          <p>${dog.breed}</p>
          <button class="vote-btn precioso ${precisoPressed}" data-index="${index}" data-type="precioso">Preciosísimo (${dog.votesPrecioso})</button> 
          <button class="vote-btn feisimo ${feisimoPressed}" data-index="${index}" data-type="feisimo">Feísisimo (${dog.votesFeisimo})</button>
        </div>`;
      dogList.innerHTML += htmlAdd;
      console.log("htmlAdd", htmlAdd)
      }
    });
  }
}
function renderPerricoArray() { //generic function. modify
  const dogList = document.querySelector('#dog-list');
  dogList.innerHTML = '';
  perricosArray.forEach((dog, index) => {
    const precisoPressed = dog.voteStatus === 'precioso' ? 'pressed' : '';
    const feisimoPressed = dog.voteStatus === 'feisimo' ? 'pressed' : '';
    const htmlAdd = `<div class="card">
      <img src="${dog.image}" alt="Perro" />
      <br />
      <p>${dog.name}</p>
      <p>Raza: ${dog.breed}</p>
        <button class="vote-btn precioso ${precisoPressed}" data-index="${index}" data-type="precioso">Preciosísimo (${dog.votesPrecioso})</button> 
        <button class="vote-btn feisimo ${feisimoPressed}" data-index="${index}" data-type="feisimo">Feísisimo (${dog.votesFeisimo})</button>
      </div>`;
    dogList.innerHTML += htmlAdd;
  });

  document.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
      handleVote(event);
    });
  });
}
/*
function deleteDogList(){
  const dogList = document.querySelector('#dog-list');
  dogList.innerHTML = '';
}*/
function searchInput(inputValue) {
  const dogList = document.querySelector("#dog-list");
  const value = inputValue.trim().toLowerCase();
  // Filtramos
  const filtered = perricosArray.filter(perrico =>
    perrico.name.toLowerCase().includes(value) || perrico.breed.toLowerCase().includes(value)
  );
  if (filtered.length === 0) {
    dogList.innerHTML = '<p style="color: red; text-align: center;">No hay nada que coincida con tu búsqueda</p>';
    return;
  }
  dogList.innerHTML = '';
  filtered.forEach((dog, index) => {
    const precisoPressed = dog.voteStatus === 'precioso' ? 'pressed' : '';
    const feisimoPressed = dog.voteStatus === 'feisimo' ? 'pressed' : '';
    const htmlAdd = `<div class="card">
      <img src="${dog.image}" alt="Perro" />
      <br />
      <p>${dog.name}</p>
      <p>Raza: ${dog.breed}</p>
      <button class="vote-btn precioso ${precisoPressed}" data-index="${index}" data-type="precioso">Preciosísimo (${dog.votesPrecioso})</button> 
      <button class="vote-btn feisimo ${feisimoPressed}" data-index="${index}" data-type="feisimo">Feísisimo (${dog.votesFeisimo})</button>
    </div>`;
    dogList.innerHTML += htmlAdd;
  });
  document.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
      handleVote(event);
    });
  });
}
function handleVote(event) {
  const index = parseInt(event.currentTarget.getAttribute('data-index'));
  const voteType = event.currentTarget.getAttribute('data-type');
  const dog = perricosArray[index];
  if (dog.voteStatus === null) {
    if (voteType === 'precioso') {
      dog.votesPrecioso += 1;
      dog.voteStatus = 'precioso';
    } else if (voteType === 'feisimo') {
      dog.votesFeisimo += 1;
      dog.voteStatus = 'feisimo';
    }
  }else if (dog.voteStatus === 'precioso') {
    if (voteType === 'precioso') {
      dog.votesPrecioso -= 1;
      dog.voteStatus = null;
    } else if (voteType === 'feisimo') {
      dog.votesPrecioso -= 1;
      dog.votesFeisimo += 1;
      dog.voteStatus = 'feisimo';
    }
  }else if (dog.voteStatus === 'feisimo') {
    if (voteType === 'feisimo') {
      dog.votesFeisimo -= 1;
      dog.voteStatus = null;
    } else if (voteType === 'precioso') {
      dog.votesFeisimo -= 1;
      dog.votesPrecioso += 1;
      dog.voteStatus = 'precioso';
    }
  }
  renderPerricoArray();
}
