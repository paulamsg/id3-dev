
const perricosArray = [];
const nameDogsArray = ['Luna', 'Walter','Simba','Rocco','Estela'];

function randomDogName(nameDogsArray){
  const randomIndex = Math.floor(Math.random() * nameDogsArray.length);
  const dogName = nameDogsArray[randomIndex];
  console.log("nombreee:", dogName)
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
  perricosArray.push({ image: perricoImg, name: dogName, votesPrecioso: 0, votesFeisimo: 0 });
  renderPerricoArray();
  updateFilterButtonCounts();
};

const addPerrico5 = async () => {
  for(let i=0 ; i<=4; i++){
    addPerrico();
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
        <button class="vote-btn precioso" data-index="${index}" data-type="precioso">Preciosísimo (${dog.votesPrecioso || 0})</button> 
        <button class="vote-btn feisimo" data-index="${index}" data-type="feisimo">Feísisimo (${dog.votesFeisimo || 0})</button>
      </div>`;
    dogList.innerHTML += htmlAdd;
  });
  document.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', (event)=>{
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
          <button class="vote-btn precioso" data-index="${index}" data-type="precioso">Preciosísimo (${dog.votesPrecioso || 0})</button> 
          <button class="vote-btn feisimo" data-index="${index}" data-type="feisimo">Feísisimo (${dog.votesFeisimo || 0})</button>
        </div>`;
      dogList.innerHTML += htmlAdd;
      }
    });
  }
}

function handleVote(event) {
  const index = parseInt(event.currentTarget.getAttribute('data-index'));
  const voteType = event.currentTarget.getAttribute('data-type');
  if (voteType === 'precioso') {
    const currentVotes = perricosArray[index].votesPrecioso || 0;
    perricosArray[index].votesPrecioso = currentVotes > 0 ? currentVotes - 1 : currentVotes + 1;
  } else if (voteType === 'feisimo') {
    const currentVotes = perricosArray[index].votesFeisimo || 0;
    perricosArray[index].votesFeisimo = currentVotes > 0 ? currentVotes - 1 : currentVotes + 1;
  }
  renderPerricoArray();
}

document.querySelector('#add-1-perrico').addEventListener('click', function () {
  addPerrico();
});

document.querySelector('#add-5-perricos').addEventListener('click', function(){
  addPerrico5();
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