const factsAndHelp = {
  "african forest elephant": [
    "They are natural gardeners, they spread tree seeds throughout forests",
    "https://protect.worldwildlife.org/page/53484/petition/1?en_og_source=Web_ActivismAction&ea.tracking.id=Web_HYCH&_gl=1*1y31ppm*_ga*ODMxMzQ2MzY4LjE2OTk2NzU3MjM.*_ga_FK6M9RK84Z*MTY5OTc1NDEwMC41LjEuMTY5OTc1NTA0OS4yNC4wLjA.*_gcl_au*MTk4NjY1ODI3My4xNjk5Njc1NzIy&_ga=2.59166126.2028295594.1699675723-831346368.1699675723",
  ],
  "amur leopard": [
    "They have adapted to colder climates, not seen in any other leopard species.",
    "https://protect.worldwildlife.org/page/53484/petition/1?en_og_source=Web_ActivismAction&ea.tracking.id=Web_HYCH&_gl=1*1y31ppm*_ga*ODMxMzQ2MzY4LjE2OTk2NzU3MjM.*_ga_FK6M9RK84Z*MTY5OTc1NDEwMC41LjEuMTY5OTc1NTA0OS4yNC4wLjA.*_gcl_au*MTk4NjY1ODI3My4xNjk5Njc1NzIy&_ga=2.59166126.2028295594.1699675723-831346368.1699675723",
  ],
  "giant panda": [
    "They have a sixth finger that is similiar to a thumb and allows it hold onto food.",
    "https://protect.worldwildlife.org/page/53515/petition/1?_gl=1*12lxrrw*_ga*ODMxMzQ2MzY4LjE2OTk2NzU3MjM.*_ga_FK6M9RK84Z*MTY5OTc1NDEwMC41LjEuMTY5OTc1NjA2Ni42MC4wLjA.*_gcl_au*MTk4NjY1ODI3My4xNjk5Njc1NzIy&_ga=2.268439026.2028295594.1699675723-831346368.1699675723 ",
  ],
  "great white shark": [
    "Over 400 million years old, making them older than dinosaurs.",
    "https://protect.worldwildlife.org/page/53559/petition/1?_gl=1*1bjbbk0*_ga*ODMxMzQ2MzY4LjE2OTk2NzU3MjM.*_ga_FK6M9RK84Z*MTY5OTc1NDEwMC41LjEuMTY5OTc1NjMxMS4zMC4wLjA.*_gcl_au*MTk4NjY1ODI3My4xNjk5Njc1NzIy&_ga=2.265093260.2028295594.1699675723-831346368.1699675723",
  ],
  "marine iguana": [
    "Unique in the fact that they are the only lizard that can swim and feed in ocean.",
    "https://protect.worldwildlife.org/page/53559/petition/1?_gl=1*1bjbbk0*_ga*ODMxMzQ2MzY4LjE2OTk2NzU3MjM.*_ga_FK6M9RK84Z*MTY5OTc1NDEwMC41LjEuMTY5OTc1NjMxMS4zMC4wLjA.*_gcl_au*MTk4NjY1ODI3My4xNjk5Njc1NzIy&_ga=2.265093260.2028295594.1699675723-831346368.1699675723",
  ],
  "tree kangaroo": [
    "The can jump thirty feet between trees.",
    "https://protect.worldwildlife.org/page/53515/petition/1?_gl=1*1dbpuku*_ga*ODMxMzQ2MzY4LjE2OTk2NzU3MjM.*_ga_FK6M9RK84Z*MTY5OTc1NDEwMC41LjEuMTY5OTc1NzQ2NC4xOC4wLjA.*_gcl_au*MTk4NjY1ODI3My4xNjk5Njc1NzIy&_ga=2.97373340.2028295594.1699675723-831346368.1699675723",
  ],
};

function scrollToContent(animal) {
  processAnimal(animal);
  document.getElementById("content").scrollIntoView({ behavior: "smooth" });
}

function processAnimal(animal) {
  fetch(`http://127.0.0.1:5000/get_animal_data?name=${animal}`)
    .then((response) => response.json())
    .then((data) => {
      let animalData = JSON.parse(data.animal_data);
      const content = document.getElementById("content");
      content.innerHTML = "";

      const textContainer = document.createElement("div");
      textContainer.classList.add("text-box");

      const heading = document.createElement("h3");
      heading.textContent = `Name: ${animalData[0].name}`;
      textContainer.appendChild(heading);

      const fact = document.createElement("p");
      fact.textContent = `Fun fact: ${factsAndHelp[animal][0]}`;
      textContainer.appendChild(fact);

      const locations = document.createElement("p");
      locations.textContent = `Locations: ${animalData[0].locations.join(
        ", "
      )}`;
      textContainer.appendChild(locations);

      const population = document.createElement("p");
      population.textContent = `Population: ${animalData[0].characteristics.estimated_population_size}`;
      textContainer.appendChild(population);

      const biggestThreat = document.createElement("p");
      biggestThreat.textContent = `Biggest Threat: ${animalData[0].characteristics.biggest_threat}`;
      textContainer.appendChild(biggestThreat);

      const prey = document.createElement("p");
      prey.textContent = `Prey: ${animalData[0].characteristics.prey}`;
      textContainer.appendChild(prey);

      const predators = document.createElement("p");
      predators.textContent = `Predators: ${animalData[0].characteristics.predators}`;
      textContainer.appendChild(predators);

      const lifespan = document.createElement("p");
      lifespan.textContent = `Lifespan: ${animalData[0].characteristics.lifespan}`;
      textContainer.appendChild(lifespan);

      const help = document.createElement("a");
      help.href = factsAndHelp[animal][1];
      help.target = "_blank";
      help.textContent = "Earn your stripes";
      textContainer.appendChild(help);

      const img = document.createElement("img");
      img.src = `animalpics/${animalData[0].name}.jpg`;
      img.className = "image-box";
      img.style = "object-fit:contain;";

      img.addEventListener("mouseover", () => {
        img.src = `animalpics/${animalData[0].name}.gif`;
      });
      img.addEventListener("mouseout", () => {
        img.src = `animalpics/${animalData[0].name}.jpg`;
      });

      content.appendChild(textContainer);
      content.appendChild(img);
    })
    .catch((error) => console.error("Error:", error));
}
