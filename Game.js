window.onload = init;

// Fonction Init
function init() {
  
  document.getElementById("tablePic").style.display = "none";
  //Introduction du bouton jouer
  document.getElementById("gameOn").addEventListener("click", show);

  // Cacher toutes les images
  var images = document.querySelectorAll("img");
  images.forEach(function (image) {
    image.style.display = "none";
  });
  
  
  let i = 0;
  while (i < 2) {
    let liste = new Set();
    let max = 6; //à changer plus tard en fonction du nombre de cartes dans le dossier

  // Fonction pour créer les cartes  
    // Créer un tableau de valeurs aléatoires entre 1 et max
    function cardsOrder(min, max) {
      return Math.floor(Math.random() * max) + 1;
    }

    while (liste.size != max) {
      let i = cardsOrder(0, max);
      liste.add(i);
    }
    console.log(liste);

    // Créer des memoryCard avec 2 faces et les placer dans tablePic
    let tablePic = document.getElementById("tablePic");
    liste.forEach(function (element) {
      let divCard = document.createElement("div");
      divCard.setAttribute("class", "memoryCard");
      divCard.setAttribute("value", element);
      let frontFace = document.createElement("img");
      frontFace.setAttribute("class", "frontFace");
      frontFace.src = `/ressources/memory-legume/${element}.svg`;
      divCard.appendChild(frontFace);

      let backFace = document.createElement("img");
      backFace.setAttribute("class", "backFace");
      backFace.src = "/ressources/question.svg";
      divCard.appendChild(backFace);
      tablePic.appendChild(divCard);
    });
    i++;
  }
  // Introduction du bouton backFace
  var cards = document.getElementsByClassName("backFace");
  Array.from(cards).forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}

// Différentes variables du jeu
let flippedCardCount = 0;
let wonCardCount = 0;
let card1 = 0;
let card2 = 0;
let score = 0;
let loggedInUsername = sessionStorage.getItem("loggedInUsername")

// Quand on appuie sur le bouton "Jouer" : affiche les cartes + background
function show() {
  score = 0;
  flippedCardCount = 0;
  wonCardCount = 0;
  document.getElementById("tablePic").style.display = "flex";
  if (loggedInUsername === null)
  { alert("Vous ne pourrez pas conserver votre score si vous n'êtes pas connecté.");
  } else {
  alert(`Bienvenue ${loggedInUsername} ! Es-tu prêt à réaliser le plus haut score du Memory ?`);
  }

  // Réinitialiser les cartes gagnées en carte faces visibles et faces mystère
  var wonBefore = document.getElementsByClassName("won");
  Array.from(wonBefore).forEach(function (newgameCard) {
    newgameCard.setAttribute("class", "memoryCard");
  });

  var displayedBefore = document.getElementsByClassName("displayed");
  Array.from(displayedBefore).forEach(function (newgamefront) {
    newgamefront.setAttribute("class", "frontFace");
  });
  var discardedBefore = document.getElementsByClassName("discarded");
  Array.from(discardedBefore).forEach(function (newgameback) {
    newgameback.setAttribute("class", "backFace");
  });

  // Cache les faces visibles
  var flipped = document.getElementsByClassName("frontFace");
  Array.from(flipped).forEach(function (hide) {
    hide.style.display = "none";
  });

  // Montre les faces mystère
  var imagesBack = document.getElementsByClassName("backFace");
  Array.from(imagesBack).forEach(function (showBack) {
    showBack.style.display = "block";
  });
}

// Fonction pour retourner les cartes

function flipCard() {
  if (flippedCardCount < 2) {
    //Première carte
    if (flippedCardCount === 0) {
      console.log("FIRST CARD");
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
      console.log("SECOND CARD");
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
        if (wonCardCount === 6) { 
          alert(`Tu as gagné ${loggedInUsername}! Ton score est de = ` + score);
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
