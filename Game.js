window.onload = init;

const imageSets = {
  alphabet: [],
  animaux: [],
  animauxAnimes: [],
  animauxDomestiques: [],
  chiens: [],
  dinosaures: [],
  dinosauresAvecNom: [],
  legume: [],
};

// Pour remplir chaque tableau avec les images des dossiers ressources

for (let i = 1; i < 27; i++) {
  imageSets.alphabet.push(`/ressources/alphabet/${i}.png`);
}
for (let i = 1; i < 28; i++) {
  imageSets.animaux.push(`/ressources/animaux/${i}.webp`);
}
for (let i = 1; i < 9; i++) {
  imageSets.animauxAnimes.push(`/ressources/animauxAnimes/${i}.webp`);
}
for (let i = 1; i < 11; i++) {
  imageSets.animauxDomestiques.push(
    `/ressources/animauxDomestiques/${i}.jpg`
  );
}
for (let i = 1; i < 24; i++) {
  imageSets.chiens.push(`/ressources/chiens/${i}.webp`);
}
for (let i = 1; i < 11; i++) {
  imageSets.dinosaures.push(`/ressources/dinosaures/${i}.jpg`);
}
for (let i = 1; i < 11; i++) {
  imageSets.dinosauresAvecNom.push(`/ressources/dinosauresAvecNom/${i}.jpg`);
}
for (let i = 1; i < 7; i++) {
  imageSets.legume.push(`/ressources/legume/${i}.svg`);
}


// Fonction Init
function init() {
  // Réserve d'images

  document.getElementById("tablePic").style.display = "none";
  //Introduction du bouton jouer
  document.getElementById("gameOn").addEventListener("click", show);

  // Cacher toutes les images
  var images = document.querySelectorAll("img");
  images.forEach(function (image) {
    image.style.display = "none";
  });

}

// FIN INIT

// Différentes variables du jeu
let flippedCardCount = 0;
let wonCardCount = 0;
let card1 = 0;
let card2 = 0;
let score = 0;
let loggedInUsername = sessionStorage.getItem("loggedInUsername");
let selectedCardNumber = sessionStorage.getItem(`cardNumber`);
if (!selectedCardNumber) {
  sessionStorage.setItem("cardNumber", "12");
  selectedCardNumber = 12;
} else {
  selectedCardNumber = parseInt(selectedCardNumber);
}
let pairsNumber = selectedCardNumber;

// Quand on appuie sur le bouton "Jouer" : efface toute ancienne partie, affiche de nouvelles cartes + background
function show() {
  score = 0;
  flippedCardCount = 0;
  wonCardCount = 0;
  document.getElementById("tablePic").style.display = "flex";
  if (loggedInUsername === null) {
    alert(
      "Vous ne pourrez pas conserver votre score si vous n'êtes pas connecté."
    );
  }

  // Supprime toutes les anciennes cartes
  let tablePic = document.getElementById("tablePic");
  tablePic.innerHTML = "";

  
 // Vérifie la présence d'un choix de cartes
 let userChoice = sessionStorage.getItem(`userChoice`) || "animaux";
 let selectedCardSet = imageSets[userChoice];

 // Vérifie la présence d'un nombre de cartes
 let maxCard = parseInt(sessionStorage.getItem(`cardNumber`)) || 12;
 let maxImagesNumber = imageSets[userChoice].length;

 // Pour créer les cartes
 let liste = new Set();

 
 //
 // Créer un tableau de valeurs aléatoires entre 1 et max
 function cardsOrder(min, max) {
   return Math.floor(Math.random() * max);
 }
 
   while (liste.size < maxCard) {
     let i = cardsOrder(0, maxImagesNumber);
     liste.add(i);
   }
 
   
 console.log("Liste de base : ", liste);

 // Double chaque élément de la liste pour faire une liste complète
 let listeDouble = [...liste, ...liste];
 console.log("Liste doublée : ", listeDouble);

 // Mélanger la liste complète
 let shuffledList = Array.from(listeDouble);
 for (let i = shuffledList.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
 }
 console.log("Liste complète : ", shuffledList);

 // Créer des memoryCard avec 2 faces et les placer dans tablePic
 // Mélanger la liste

 shuffledList.forEach(function (element) {
   let divCard = document.createElement("div");
   divCard.setAttribute("class", "memoryCard");
   divCard.setAttribute("value", element);
   let frontFace = document.createElement("img");
   frontFace.setAttribute("class", "frontFace");
   frontFace.style.display = "none";
   frontFace.src = selectedCardSet[element];
   //frontFace.src = `/ressources/memory-legume/${element}.svg`;
   divCard.appendChild(frontFace);

   let backFace = document.createElement("img");
   backFace.setAttribute("class", "backFace");
   backFace.src = "/ressources/question.svg";
   divCard.appendChild(backFace);
   tablePic.appendChild(divCard);
 });


 // Introduction du bouton backFace
 var cards = document.getElementsByClassName("backFace");
 Array.from(cards).forEach((card) => {
   card.addEventListener("click", flipCard);
 });
}

// Fonction pour retourner les cartes
function flipCard() {
  if (flippedCardCount < 2) {
    //Première carte
    if (flippedCardCount === 0) {
      flippedCardCount++;
      console.log("Cartes retournées =", flippedCardCount);
      this.parentElement.setAttribute("id", "card1");
      card1 = this.parentElement.getAttribute("value");
      console.log("Valeur carte 1 =", card1);
      var card = this.parentElement;
      var backFace = card.querySelector(".backFace");
      var frontFace = card.querySelector(".frontFace");
      backFace.style.display = "none";
      frontFace.style.display = "block";

      //Deuxième carte
    } else if (flippedCardCount === 1) {
      flippedCardCount++;
      console.log("Cartes retournées =", flippedCardCount);
      this.parentElement.setAttribute("id", "card2");
      card2 = this.parentElement.getAttribute("value");
      console.log("Valeur carte 2 =", card2);
      var card = this.parentElement;
      var backFace = card.querySelector(".backFace");
      var frontFace = card.querySelector(".frontFace");
      backFace.style.display = "none";
      frontFace.style.display = "block";

      // Après avoir retourné 2 cartes :
      // Si les 2 cartes retournent la même image
      if (card1 === card2) {
        setTimeout(function () {
          console.log("BRAVO !");
          score += 10;
          console.log("Score:", score);
          card1 = 0;
          card2 = 0;
          document.getElementById("card1").setAttribute("class", "won");
          document.getElementById("card2").setAttribute("class", "won");
          document.getElementById("card1").removeAttribute("id");
          document.getElementById("card2").removeAttribute("id");
          flippedCardCount = 0;
          wonCardCount++;
          console.log("Nombre de cartes gagnée :", wonCardCount);
          if (wonCardCount === pairsNumber) {
            alert(
              `Tu as gagné ${loggedInUsername}! Ton score est de = ` + score
            );
            if (loggedInUsername != null) {
              localStorage.setItem(`score${loggedInUsername}`, score);
            }
          }
        }, 500);

        // Si les 2 cartes sont différentes
      } else {
        // Délai de 1sec avant de retourner les cartes différentes
        setTimeout(function () {
          card1 = 0;
          card2 = 0;
          score -= 2;
          console.log("Score:", score);
          document.getElementById("card1").removeAttribute("id");
          document.getElementById("card2").removeAttribute("id");
          var flipped = document.getElementsByClassName("frontFace");
          Array.from(flipped).forEach(function (hide) {
            hide.style.display = "none";
          });
          var boum = document.getElementsByClassName("backFace");
          Array.from(boum).forEach(function (again) {
            again.style.display = "block";
          });
          flippedCardCount = 0;
        }, 1000);
      }
    }
  }
  // Fonction pour laisser retournées les cartes gagnées
  var wonCard = document.getElementsByClassName("won");
  Array.from(wonCard).forEach(function (change) {
    var firstChild = change.firstElementChild;
    if (firstChild) {
      firstChild.setAttribute("class", "displayed");
      firstChild.style.display = "block";
    }
    var secondChild = change.lastElementChild;
    if (secondChild) {
      secondChild.setAttribute("class", "discarded");
      secondChild.style.display = "none";
    }
  });
}
