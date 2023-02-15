let map = [];
map[0] = "Vanha linnan torni";
map[1] = "Syvä kaivo";
map[2] = "Aurinkoinen metsäaukio";
map[3] = "Nukkuva lohikäärme";
map[4] = "Kapea metsäpolku";
map[5] = "Vanha portti";
map[6] = "Joen ranta";
map[7] = "Tyhjä puupenkki";
map[8] = "Vanha mökki, sisältä kuuluu hiljaista musiikkia";

// Sijainti pelin alussa
let mapLocation = 4

let images = []
images[0] = "torni.jpg"
images[1] = "kaivo.jpg"
images[2] = "aukio.jpg"
images[3] = "dragon.jpg"
images[4] = "polku.jpg"
images[5] = "portti.jpg"
images[6] = "joki.jpg"
images[7] = "penkki.jpg"
images[8] = "mokki.jpg"
images[9] = "järvi.jpg"

let blockMessage = []
blockMessage[0] = "Haluamasi reitti on liian vaarallinen."
blockMessage[1] = "Salaperäinen voima estää liikkumisen tuohon suuntaan."
blockMessage[2] = "Vaikeakulkuinen pusikko estää liikkumisesi."
blockMessage[3] = "Et pääse ohittamaan lohikäärmettä sitä kautta."
blockMessage[4] = ""
blockMessage[5] = "Portti sulkeutui."
blockMessage[6] = "Joki on liian syvä ylitettäväksi."
blockMessage[7] = "Metsä on liian tiheä läpäistäväksi."
blockMessage[8] = "Olet liian peloissasi mennäksesi tuohon suuntaan."



// Pelaajan syöte
let playersInput = "";
// Pelin viesti
let gameMessage = "";
// Pelaajan käytössä olevat toiminnot
let actionsForPlayer = ["pohjoinen", "itä", "etelä", "länsi","poimi", "käytä", "pudota","kutsu"];
let action = "";
let items = ["kivi", "lasso","koira","huilu", "miekka"]
let itemLocations = [ 2, 6, 5,]
let backPack = []
let knownItems = ["huilu","kivi", "miekka","lasso","koira"]
let item = ""
// Käyttöliittymäelementit
let output = document.querySelector("#output");
let input = document.querySelector("#input");
let image = document.querySelector("img")
//output.innerHTML = "Sijaintisi: <br>" + map[mapLocation];
// Nappi
let button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);

// Päivitä pelaajan sijainti
render()

function clickHandler() {
  console.log("Nappia painettu");
  
}
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("nappi").click();
    playGame()
  }
});

function playGame() {
  // Lue pelaajan syöte ja muuta se pieniksi kirjaimiksi
  playersInput = input.value.toLowerCase();
  // Nollaa nämä muuttujat edelliseltä kierrokselta
  gameMessage = "";
  action = "";
  // Tarkista pelaajan syöte ja tee tarvittavat toimenpiteet
  for (i = 0; i < actionsForPlayer.length; i++) {
    if (playersInput.indexOf(actionsForPlayer[i]) !== -1) {
      action = actionsForPlayer[i];
      console.log("Pelaajan valinta " + action + " tunnistettiin");
      break;
    }
  }

  for (i = 0; i < knownItems.length; i++) {
    if (playersInput.indexOf(knownItems[i]) !== -1) {
      item = knownItems[i]
      console.log("Pelaajan valitsema esine: " + item)
      break
    }
  }

  // Switch case toiminnoille
  switch (action) {
    case "pohjoinen":
      if (mapLocation >= 3)
        mapLocation -= 3
      else
        gameMessage = blockMessage[mapLocation]
      break

    case "itä":
      if (mapLocation % 3 != 2)
        mapLocation += 1
      else
        gameMessage = blockMessage[mapLocation]
      break

    case "etelä":
      if (mapLocation < 6)
        mapLocation += 3
      else
        gameMessage = blockMessage[mapLocation]
      break

    case "länsi":
      if (mapLocation % 3 != 0)
        mapLocation -= 1
      else
        gameMessage = blockMessage[mapLocation]
      break
    case "kutsu":
        takeItem()
        break
    

    case "poimi":
      takeItem()
      break
   
    case "käytä":
      useItem()
      break
    
    case "pudota":
        dropItem()
        break 
    

    default:
      gameMessage = "Tuntematon toiminto"
  }
  render()
}

function takeItem() {
  let itemIndexNumber = items.indexOf(item)
  if (itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === 5){
     gameMessage = item + " lähti juosten karkuun."
     items.splice(itemIndexNumber, 1)
     itemLocations.splice(itemIndexNumber, 1)
     
     // Lisää esine reppuun
    
   }
  else if (itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === mapLocation) {
    gameMessage = "Poimit esineen: " + item
    // Lisää esine reppuun
    backPack.push(item)
    // Poista esine kartalta
    items.splice(itemIndexNumber, 1)
    itemLocations.splice(itemIndexNumber, 1)
    console.log("Kartalla:" + items)
    console.log("Mukana:" + backPack)
  } else {
    gameMessage = "Et voi tehdä tätä toimintoa."
  }

}


function useItem() {
  let backPackIndexNumber = backPack.indexOf(item)

  if (backPackIndexNumber === -1) {
    gameMessage += "Sinulla ei ole sitä mukana"
  }
  if (backPack.length === 0) {
    gameMessage += "Sinulla ei ole mitään mukana"
  }

  if (backPackIndexNumber !== -1) {

    switch (item) {
      case "huilu":
        if (mapLocation === 8)
        
        gameMessage = "Kaunis musiikki kaikuu ympärilläsi kunnes " + item + " haihtui ilmaan ja kirkas valo välähti ja uusi esine ilmesty eteesi."
        knownItems.push(backPack[item])
        items.push(backPack[backPackIndexNumber]);
        itemLocations.push(mapLocation); 

        // Lisää esine reppuun
        
        backPack.splice(backPackIndexNumber, 1)
        break

      case "miekka":
        if (mapLocation === 3)
          gameMessage = "Heilautat miekkaasi ja tapat lohikäärmeen.",
          window.alert("Läpäisit pelin!!!")
          
        else
          gameMessage = "Heiluttelet miekkaasi tylsistyneenä"
        break
      case "lasso":
        gameMessage = "heiluttelet lassoa innoissasi"
        break
      
      case "kivi":
        if (mapLocation === 1) {
          gameMessage = "heitit esineen: " + item + " kaivoon."
          knownItems.push(backPack[item])
          items.push(backPack[backPackIndexNumber]);
          itemLocations.push(mapLocation); 

          // Lisää esine reppuun
          
          backPack.splice(backPackIndexNumber, 1)
          
        } else
          gameMessage = "Pyörittelet kiveä taskussasi"
        break

    }
  }

}

function dropItem() {
  // Voit pudottaa esineen vain jos repussa on jotain
  if (backPack.length !== 0) {
    // Etsi repusta tekstikentässä mainitun esineen index
    let backPackIndexNumber = backPack.indexOf(item)
    // Esine löytyi jos index ei ole -1
    if (backPackIndexNumber !== -1) {
      // Kerro pelaajalle että esine on pudotettu
      gameMessage = "Pudotit esineen: " + item + "."
      // Siirrä esine repusta peliympäristöön
      
      itemLocations.push(mapLocation)
      // Poista esine repusta
      backPack.splice(backPackIndexNumber, 1)
    } else {
      // Viesti jos yritetään pudottaa
      // esinettä joka ei ole repussa
      gameMessage = "Et voi tehdä tätä.";
    }
  } else {
    // Viesti jos reppu on tyhjä
    gameMessage = "Sinulla ei ole mitään mukana.";
  }
}



function render() {
  // Päivitä sijainti
  output.innerHTML = "Sijaintisi: " + map[mapLocation]

  if (backPack.length != 0) {
    output.innerHTML += "<br>Mukanasi on: " + backPack.join(", ")
  }
  if (mapLocation === 5){
    for (let i = 0; i < items.length; i++) {
     if(mapLocation === itemLocations[i])
         output.innerHTML += "<br>näet eläimen: <strong>" + items[i] + "</strong>"
    }
  } else {
   for (let i = 0; i < items.length; i++) {
    if (mapLocation === itemLocations[i])
      output.innerHTML += "<br>Näet esineen: <strong>" + items[i] + "</strong>"
    
  }}
  image.src = "images/" + images[mapLocation]
  // Päivitä palaute
  output.innerHTML += "<br><em>" + gameMessage + "</em>"

}