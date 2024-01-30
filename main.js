const players = [
  {
    id: 1,
    name: "Devon Toews",
    team: "Avalanche"
  },
  {
    id: 2,
    name: "Ryan Johansen",
    team: "Avalanche"
  },
  {
    id: 3,
    name: "Connor McDavid",
    team: "Oilers"
  },
  {
    id: 4, 
    name: "Leon Draisitl",
    team: "Oilers"
  },
  {
    id: 5,
    name: "Nathan MacKinnon",
    team: "Avalanche"
  },
  {
    id: 6,
    name: "Mattias Ekholm",
    team: "Oilers"
  },
  {
    id: 7,
    name: "Filip Forsberg",
    team: "Predators"
  },
  {
    id: 8,
    name: "Gustav Nyquist",
    team: "Predators"
  },
  {
    id: 9,
    name: "Juuse Saros",
    team: "Predators"
  },
  {
    id: 10,
    name: "Steve Yzerman",
    team: "Red Wings"
  },
  {
    id: 11,
    name: "Alex DeBrincat",
    team: "Red Wings"
  },
  {
    id: 12,
    name: "Patrick Kane",
    team: "Red Wings"
  }
];

// const benchPlayers = [
//   {
//     id: 1,
//     message: `Sadly, ${benchPlayers.name} didn't make the cut`
//   }
// ]


// for randomizer?
const teamSort = ["Red Wings", "Avalanche", "Oilers", "Predators"]

const cardsOnDom = (players) => {
  let domString = "";
  for (const player of players) {
    domString += `<div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title playerName">${player.name}</h5>
      <p class="card-text team">${player.team}</p>
      <button class="submit" id="bench--${player.id}">Bench</button>
    </div>
  </div>`;
  }
  const renderToDom = (divId, htmlToRender) => {
    const selectedDiv = document.querySelector(divId);
    selectedDiv.innerHTML = htmlToRender;
  };

  renderToDom("#players", domString);
};

cardsOnDom(players);

// let showFirst = 


const sort = document.querySelector("#sort-btn");
const showAll = document.querySelector("#all-btn");
const showRedWings = document.querySelector("#wings-btn");
const showPredators = document.querySelector("#pred-btn");
const showOilers = document.querySelector("#oil-btn");
const showAvalanche = document.querySelector("#aves-btn");

sort.addEventListener('click', showFirst);
sort.addEventListener('submit', showSecond);


showAll.addEventListener('click', () => {
  cardsOnDom(players);
});

showRedWings.addEventListener('click', (e) => {
// targets the button in html to connect the filter
  if (e.target.id.includes("wings-btn")) {
  const filterWings = players.filter((player) => player.team === "Red Wings");
  cardsOnDom(filterWings);
  }
});

showPredators.addEventListener('click', (e) => {
    if (e.target.id.includes("pred-btn")) {
    const filterPreds = players.filter((player) => player.team === "Predators")
    cardsOnDom(filterPreds);
    }
});

showOilers.addEventListener('click', (e) => {
    if (e.target.id.includes("oil-btn")) {
    const filterOilers = players.filter((player) => player.team === "Oilers")
    cardsOnDom(filterOilers);
    }
});

showAvalanche.addEventListener('click', (e) => {
    if (e.target.id.includes("aves-btn")) {
    const filterAvalanche = players.filter((player) => player.team === "Avalanche")
    cardsOnDom(filterAvalanche);
    }
});

const form = document.querySelector("form");

const newPlayer = (e) => {
  e.preventDefault()

  const newPlayer = {
    id: players.length +1,
    name: document.querySelector("#playerName").value,
  }

  players.push(newPlayer);
  cardsOnDom(players);
  form.reset();
}

form.addEventListener('submit', newPlayer);

// need if else statement to make innerHTML work?
error.innerHTML = "Enter player name to continue" 



// randomizer
let randomTeam = teamSort
  .map(value => ({value, sort: Math.random()}))
  .sort((a, b) => a.sort - b.sort)
  .map(({value}) => value)
console.log(randomTeam);




const benchPlayer = document.querySelector("#players");

benchPlayer.addEventListener('click', (e) => {
  if (e.target.id.includes("bench")) {
    const [, id] = e.target.id.split("--");
    const index = players.findIndex((player) => player.id === Number(id));
    players.splice(index, 1);
    cardsOnDom(players);
  }
});



const startApp = () => {
  cardsOnDom(players);
};

startApp();
