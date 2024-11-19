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

// Introduciton du bouton backFace
  var cards = document.getElementsByClassName("backFace");
  Array.from(cards).forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}


// Quand on appuie sur le bouton "Jouer" : affiche les cartes + background
function show() {
  document.getElementById("tablePic").style.display = "block";

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

// Différentes variables du jeu
let flippedCardCount = 0;
let wonCardCount = 0;
let card1 = 0;
let card2 = 0;

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
        console.log("BRAVO !");
        wonCardCount++;
        console.log("Nombre de cartes gagnée :", wonCardCount);
        card1 = 0;
        card2 = 0;
        document.getElementById("card1").setAttribute("class", "won");
        document.getElementById("card2").setAttribute("class", "won");
        document.getElementById("card1").removeAttribute("id");
        document.getElementById("card2").removeAttribute("id");
        flippedCardCount = 0;

        // Si les 2 cartes sont différentes
      } else {
        // Délai de 1sec avant de retourner les cartes différentes
        setTimeout(function() {
        card1 = 0;
        card2 = 0;
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
 




  


// var showFace = document.getElementsByClassName("frontFace");
//   Array.from(showFace).forEach(function (face) {
//       face.style.display = "block";
//   });
//   var hideBack = document.getElementsByClassName("backFace");
//   Array.from(hideBack).forEach(function (back) {
//       back.style.display = "none";
//   });

//}

// var imagesGame = document.getElementsByClassName("imgLeg");

// //Loop pour appliquer la fonction Flip à chaque image de Légumes
// Array.from(imagesGame).forEach(function (imageFl) {
//     imageFl.addEventListener("click", flip);
//     })

// }

// // fonction pour montrer l'image mystère à la place de chaque image légume
// function show () {
//     var imagesDisplay = document.getElementsByClassName("backFace");

//     Array.from(imagesDisplay).forEach(function (showBack){
//         showBack.style.display = "block";
//         showBack.addEventListener("click", flip);

//     })
// }

//Fonction pour retourner chaque carte mystère et montrer l'image originale à la place
// function flip(flipImage) {

//  const originalImage = document.getElementsByClassName("imgL");
// originalImage.forEach(function(imageshow){
//     imageshow.style.display = "block";
//  })
//     const currentImageSrc = flipImage.target.src;

//     if (currentImageSrc !== originalImage) {
//       flipImage.target.src = originalImage;
//       flipImage.target.classList.add("flipped");
//     } else {

//       flipImage.target.src = document.getElementById("imgMyst").src;
//       flipImage.target.classList.remove("flipped");
//     }
//   }

// function init() {
//     cloneImage();
// }

// Fonction pour cloner chaque image du memory
// function cloneImage() {

//     var tablePic = document.getElementById("tablePic");

//     var img1 = document.getElementsByClassName("img");

//     for (var i =0; i < img1.length; i++) {
//         var clonedImg = img1[i].cloneNode(true);
//         tablePic.appendChild(clonedImg);
//     }

//
