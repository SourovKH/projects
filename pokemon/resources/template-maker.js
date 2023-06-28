const {readFileSync} = require("fs");

const processCard = (card) => {
  const [id, name, types, speed, hp, xp, attack, defense, weight] = card.split("|");
  const imgId = id.toString().padStart(3, 0);
  const processedCard = ` <div class="poke-card">
  <figure>
    <div class="poke-img" style="background-image: url(https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imgId}.png);">
    </div>
    <figcaption>${name}</figcaption>
  </figure>
  <div class="poke-attributes">
    <div class="poke-attribute">
      <div class="label">Types</div>
      <div class="value">${types}</div>
    </div>
    <div class="poke-attribute">
      <div class="label">Speed</div>
      <div class="value">${speed}</div>
    </div>
    <div class="poke-attribute">
      <div class="label">HP</div>
      <div class="value">${hp}</div>
    </div>
    <div class="poke-attribute">
      <div class="label">XP</div>
      <div class="value">${xp}</div>
    </div>
    <div class="poke-attribute">
      <div class="label">Attack</div>
      <div class="value">${attack}</div>
    </div>
    <div class="poke-attribute">
      <div class="label">Defense</div>
      <div class="value">${defense}</div>
    </div>
    <div class="poke-attribute">
      <div class="label">Weight</div>
      <div class="value">${weight}</div>
    </div>
  </div>
</div>`

  return processedCard;
}

const processCardRows = (cardRow) => {
  return cardRow.split("\n").map(processCard).join("\n");
}

const main = () => {
  const rawData = readFileSync("./resources/information.txt", "utf-8");
  const cards = rawData.split("\n").slice(1);
  const processedCardRows = `${cards.map(processCardRows).join("")}`;
  console.log(processedCardRows);
}

main();