
const perricosArray = [];
const nameDogsArray = ['Luna', 'Walter','Simba','Rocco','Estela'];


function randomDogName(nameDogsArray){
  const randomIndex = Math.floor(Math.random() * nameDogsArray.length);
  const dogName = nameDogsArray[randomIndex];
  console.log("nombre del perro:", dogName)
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
const addPerrico = async () => {
  const perricoImg = await getRandomDogImage();
  const dogName = randomDogName(nameDogsArray);
  perricosArray.push({ image: perricoImg, name: dogName, votesPrecioso: Math.floor(Math.random()*100), votesFeisimo: Math.floor(Math.random()*67), voteStatus : null  });
  renderPerricoArray();
  updateFilterButtonCounts();
};
const addPerrico5 = async () => {
  for(let i=0 ; i<=4; i++){
    await addPerrico();
  }
};
function renderPerricoArray() {
  const dogList = document.querySelector('#dog-list');
  dogList.innerHTML = '';
  perricosArray.forEach((dog, index) => {
    const htmlAdd = `<div class="card">
      <img src="${dog.image}" alt="Perro" />
      <br />
      <p>${dog.name}</p>
        <button class="vote-btn precioso" data-index="${index}" data-type="precioso">Preciosísimo (${dog.votesPrecioso})</button> 
        <button class="vote-btn feisimo" data-index="${index}" data-type="feisimo">Feísisimo (${dog.votesFeisimo})</button>
      </div>`;
    dogList.innerHTML += htmlAdd;
  });
  document.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
      handleVote(event);
    });
  });
}

function filterDog(dogNameButton){
  const dogList = document.querySelector('#dog-list');
  dogList.innerHTML='';
  if(dogNameButton){
    perricosArray.forEach((dog, index) => {
      if((dog.name).toLowerCase().includes(dogNameButton)){ 
        const htmlAdd = `<div class="card">
          <img src="${dog.image}" alt="Perro" />
          <br />
          <p>${dog.name}</p>
          <button class="vote-btn precioso" data-index="${index}" data-type="precioso">Preciosísimo (${dog.votesPrecioso})</button> 
          <button class="vote-btn feisimo" data-index="${index}" data-type="feisimo">Feísisimo (${dog.votesFeisimo})</button>
        </div>`;
      dogList.innerHTML += htmlAdd;
      }
    });
    document.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
      handleVote(event);
    });
  });
  }
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
/*
function disabledAllButtons(){
  const btns = document.querySelectorAll('.add');
  btns.forEach((bt) =>{
    bt.disabled=true;
  });
}
function enabledAllButtons(){
  const btns = document.querySelectorAll('.add');
  btns.forEach((bt) =>{
    bt.disabled=false;
  });
}
*/
document.querySelector('#add-1-perrico').addEventListener('click', async function () {
  //disabledAllButtons();
  await addPerrico();
  //enabledAllButtons();
  
});
document.querySelector('#add-5-perricos').addEventListener('click', async function(){
  //disabledAllButtons();
  await addPerrico5();
  //enabledAllButtons();
});
document.querySelectorAll('.filter-dog').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const dogNameButton = event.currentTarget.id;
    const wasActive = btn.classList.contains('pressed');
    document.querySelectorAll('.filter-dog').forEach((b) => b.classList.remove('pressed'));
    if (wasActive) {
      renderPerricoArray();
    } else {
      btn.classList.add('pressed');
      filterDog(dogNameButton);
    }
  });
});

async function showApi(){
  const breeds = await getAllBreeds();
  console.log(breeds);
}
showApi();