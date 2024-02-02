const players = [
  {
    id: 1,
    name: "Devon Toews",
    team: "Avalanche",
  },
  {
    id: 2,
    name: "Ryan Johansen",
    team: "Avalanche",
  },
  {
    id: 3,
    name: "Connor McDavid",
    team: "Oilers",
  },
  {
    id: 4,
    name: "Leon Draisitl",
    team: "Oilers",
  },
  {
    id: 5,
    name: "Nathan MacKinnon",
    team: "Avalanche",
  },
  {
    id: 6,
    name: "Mattias Ekholm",
    team: "Oilers",
  },
  {
    id: 7,
    name: "Filip Forsberg",
    team: "Predators",
  },
  {
    id: 8,
    name: "Gustav Nyquist",
    team: "Predators",
  },
  {
    id: 9,
    name: "Juuse Saros",
    team: "Predators",
  },
  {
    id: 10,
    name: "Steve Yzerman",
    team: "Red Wings",
  },
  {
    id: 11,
    name: "Alex DeBrincat",
    team: "Red Wings",
  },
  {
    id: 12,
    name: "Patrick Kane",
    team: "Red Wings",
  },
];



const teamSort = ["Red Wings", "Avalanche", "Oilers", "Predators"];

const renderToDom = (divId, htmlToRender) => {
  console.log(divId)
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToRender;
};

const cardsOnDom = (players) => {
  let domString = "";
  players.map((player) => {
    // += appends data to the domString
    domString += `<div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title playerName">${player.name}</h5>
      <p class="card-text team">${player.team}</p>
      <button class="submit" id="bench--${player.id}">Bench</button>
    </div>
  </div>`;
  });
  renderToDom("#players", domString);
};



const sort = document.querySelector("#sort-btn");
const form = document.querySelector("form");
const btnGroup = document.querySelector("#btnGroup");

const filterButtons = () => {
  let domString = `<a href="#" id="wings-btn" class="btn btn-primary">Red Wings</a>
  <a href="#" id="pred-btn" class="btn btn-primary">Predators</a>
  <a href="#" id="oil-btn" class="btn btn-primary">Oilers</a>
  <a href="#" id="aves-btn" class="btn btn-primary">Avalanche</a>
  <a href="#" id="all-btn" class="btn btn-primary">All</a>`;
  renderToDom("#btnGroup", domString);
};

const playerForm = () => {
  let domString = `<label for="name" class="form-label">Player Name</label>
  <input type="text" class="form-control" id="playerName" required>
  <button id="sort-btn" type="submit" class="sort-btn btn-primary">May the Odds be ever in Your Favor!</button>`;
  renderToDom("#playerForm", domString);
};

const newPlayer = (e) => {
  e.preventDefault();

  const newPlayer = {
    id: players.length + 1,
    name: document.querySelector("#playerName").value,
    // uses the teamSort arry to generate a random number  * length of the array to randomly select and index, the Math.floor rounds to a whole number, corresponding to a value within the array
    team: teamSort[Math.floor(Math.random() * teamSort.length)],
  };

  players.push(newPlayer);
  cardsOnDom(players);
  form.reset();
};

sort.addEventListener("click", playerForm);
form.addEventListener("submit", (e) => {
  newPlayer(e);
  filterButtons();
});




btnGroup.addEventListener("click", (e) => {
  if (e.target.id.includes("wings-btn")) {
    const filterWings = players.filter((player) => player.team === "Red Wings");
    cardsOnDom(filterWings);
  }
  if (e.target.id.includes("pred-btn")) {
    const filterPreds = players.filter((player) => player.team === "Predators");
    cardsOnDom(filterPreds);
  }
  if (e.target.id.includes("oil-btn")) {
    const filterOilers = players.filter((player) => player.team === "Oilers");
    cardsOnDom(filterOilers);
  }
  if (e.target.id.includes("aves-btn")) {
    const filterAvalanche = players.filter(
      (player) => player.team === "Avalanche");
    cardsOnDom(filterAvalanche);
  }
  if (e.target.id.includes("all-btn")) {
    cardsOnDom(players);
  }
});

const benchPlayers = []

// benched function
const benchBtn = document.querySelector("#players")



function renderToBenchedDom() {
  let domString = "";
  benchPlayers.map((benchPlayer) => {
    domString += `<div class="card benched" style="width: 18rem;"> <img src="Assets/bench.jpeg" class="card-img-top"> <class="card-body"><h5 class="card-title">Benched Players.</h5><p id="benchedPlayer">Sorry ${benchPlayer.name}, you didn't make the cut. Try again next year.</p></div>`
  })
  // renderToBenchedDom("#benchedCards", domString)
};



benchBtn.addEventListener("click", (e) => {
  if (e.target.id.includes("bench")) {
    const [, id] = e.target.id.split("--");
    const index = players.findIndex((player) => player.id === Number(id));
    benchPlayers.push(players.splice(index, 1));
  }
  renderToDom("#players", cardsOnDom(players));
  renderToBenchedDom();
});
