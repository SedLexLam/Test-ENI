window.onload = init;

function init() {
  // Pour la fonction inscription
  let userForm = document.getElementById("userForm");
  if (userForm) {
    userForm.addEventListener("submit", getdata);
  }
  // Pour la fonction Force du password
  let password = document.getElementById("password");
  if (password) {
    password.addEventListener("input", passwordStrength);
  }
  // Pour la fonction connexion
  let loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", login);
  }

  // Afficher le nom d'utilisateur et mon meilleur score
  let myData = document.getElementById("myData");
  if (myData) {
    function showProfile() {
      let loggedInUsername = sessionStorage.getItem("loggedInUsername");
      let currentUser = document.createElement("div");
      myData.appendChild(currentUser);
      let myScore = 0;
      if (loggedInUsername !== null) {
        currentUser.innerHTML =
          "Mon nom d'utilisateur : " + loggedInUsername + "<br />";
      } else {
        currentUser.innerHTML = "Non connecté <br />";
      }

      // Vérifier si l'utilisateur connecté a un score déjà enregistré
      for (let i = 0; i < localStorage.length; i++) {
        let storedUsername = localStorage.getItem(`username${i}`);

        if (loggedInUsername === storedUsername) {
          myScore = localStorage.getItem(`score${loggedInUsername}`);
          if (myScore === null) {
            myScore = 0;
          }
        }
      }

      currentUser.innerHTML += "Mon meilleur score : " + myScore;
      myData.appendChild(currentUser);
    }
    showProfile();
  }

  // Choisir le nombre de cartes
  sessionStorage.setItem("cardNumber", "3"); // Valeur par défaut
  let choiceCardNumber = document.getElementById("choiceCardNumber");
  if (choiceCardNumber) {
    choiceCardNumber.style.display = "none";
    document.getElementById(id = "choiceCardTitle").style.display = "none";
    choiceCardNumber.addEventListener("change", function (changeCard) {
      sessionStorage.setItem("cardNumber", choiceCardNumber.value);
    });
  }

  // Choisir le jeu de cartes
  sessionStorage.setItem("userChoice", "alphabet"); // Valeur par défaut
  let choiceCard = document.getElementById("choiceCard");
  if (choiceCard) {
    choiceCard.addEventListener("change", activeChoiceCard); 
  }

  // Pour la fonction afficher le tableau des scores
  let tableScore = document.getElementById("tableScore");
  if (tableScore) {
    function showScore() {
      let scoreList = document.getElementById("tableScore");

      let users = [];
      let rankCount = 0;
      console.log("Taile du localstorage : " + localStorage.length);

      // Pour avoir le nombre d'utilisateurs avec un score
      let userScoreCount = 0;
      for (let i = 0; i <= localStorage.length; i++) {
        let username = localStorage.getItem(`username${i}`);
        let score = localStorage.getItem(`score${username}`);

        if (username && score != null) {
          userScoreCount++;
        }
      }
      console.log("Nombre d'utilisateurs avec score : " + userScoreCount);

      // Retrouve les utilisateurs et leurs scores associées et les envoie dans let users
      for (let i = 1; i <= localStorage.length; i++) {
        let username = localStorage.getItem(`username${i}`);
        let score = localStorage.getItem(`score${username}`);

        if (username && score != null) {
          console.log(`Username: ${username}, Score: ${score}`);
          users.push({ username: username, score: score });
        }
      }

      // Classe les scores dans l'ordre décroissant
      users.sort((a, b) => b.score - a.score);

      // Créer les div affichant les scores des utilisateurs
      if (users.length > 0) {
        let topUsers = users.slice(0, 5);
        topUsers.forEach((user) => {
          let scoreContainer = document.createElement("div");
          scoreContainer.setAttribute("class", "scoreContainer");
          scoreList.appendChild(scoreContainer);

          let rank = document.createElement("div");
          rank.setAttribute("class", "rank");
          rankCount++;
          rank.innerHTML = rankCount;
          scoreContainer.appendChild(rank);

          let userDiv = document.createElement("div");
          userDiv.setAttribute("class", "userDiv");
          userDiv.innerHTML = `${user.username}`;
          scoreContainer.appendChild(userDiv);

          let scoreDiv = document.createElement("div");
          scoreDiv.setAttribute("class", "scoreDiv");
          scoreDiv.innerHTML = `${user.score}`;
          scoreContainer.appendChild(scoreDiv);
        });
      } else {
        scoreList.innerHTML = "Il n'y aucun score disponible.";
      }
    }
    showScore();
  }
}

// FIN INIT

function activeChoiceCard () {
  sessionStorage.setItem("userChoice", choiceCard.value);
  if (choiceCardNumber) {
    let userChoice = sessionStorage.getItem(`userChoice`);
    switch (userChoice) {
      case "alphabet":
        document.getElementById("9card").style.display = "block";
        document.getElementById("12card").style.display = "block";
        document.getElementById("15card").style.display = "block";
        break;

      case "animaux":
        document.getElementById("9card").style.display = "block";
        document.getElementById("12card").style.display = "block";
        document.getElementById("15card").style.display = "block";
        break;

      case "animauxAnimes":
        document.getElementById("9card").style.display = "none";
        document.getElementById("12card").style.display = "none";
        document.getElementById("15card").style.display = "none";
        break;

      case "animauxDomestiques":
        document.getElementById("9card").style.display = "block";
        document.getElementById("12card").style.display = "none";
        document.getElementById("15card").style.display = "none";
        break;

      case "chiens":
        document.getElementById("9card").style.display = "block";
        document.getElementById("12card").style.display = "block";
        document.getElementById("15card").style.display = "block";
        break;

      case "dinosaures":
        document.getElementById("9card").style.display = "block";
        document.getElementById("12card").style.display = "none";
        document.getElementById("15card").style.display = "none";
        break;

      case "dinosauresAvecNom":
        document.getElementById("9card").style.display = "block";
        document.getElementById("12card").style.display = "none";
        document.getElementById("15card").style.display = "none";
        break;

      case "legume":
        document.getElementById("9card").style.display = "none";
        document.getElementById("12card").style.display = "none";
        document.getElementById("15card").style.display = "none";
        break;

    }
    document.getElementById(id = "choiceCardTitle").style.display = "block";
    choiceCardNumber.style.display = "block";
  }
};

// Variables du localStorage
let userCount = 0;
for (let i = 0; i < localStorage.length; i++) {
  let username = localStorage.getItem(`username${i}`);

  if (username !== null) {
    userCount++;
  }
}
console.log("Nombre d'utilisateurs : " + userCount);
let emailCount = 0;
for (let i = 0; i < localStorage.length; i++) {
  let email = localStorage.getItem(`email${i}`);

  if (email !== null) {
    emailCount++;
  }
}
let passwordCount = 0;
for (let i = 0; i < localStorage.length; i++) {
  let password = localStorage.getItem(`password${i}`);

  if (password !== null) {
    passwordCount++;
  }
}

// Pour afficher la force du password
const passwordField = document.querySelector("#password");
if (passwordField) {
  function passwordStrength() {
    let passwordInput = document.getElementById("passwordInput");

    let previousStrength = passwordInput.querySelector(".passwordStrength");
    if (previousStrength) {
      previousStrength.remove();
    }

    if (password.value.length < 7) {
      let passwordWeak = document.createElement("div");
      passwordWeak.setAttribute("class", "passwordStrength");
      passwordWeak.setAttribute("id", "weak");
      passwordWeak.innerHTML = "Faible";
      passwordInput.appendChild(passwordWeak);
    } else if (
      password.value.length > 9 &&
      /[A-Z]/.test(password.value) &&
      /[0-9]/.test(password.value) &&
      /[^a-zA-Z0-9]/.test(password.value)
    ) {
      let passwordStrong = document.createElement("div");
      passwordStrong.setAttribute("class", "passwordStrength");
      passwordStrong.setAttribute("id", "strong");
      passwordStrong.innerHTML = "Fort";
      passwordInput.appendChild(passwordStrong);
    } else {
      let passwordMedium = document.createElement("div");
      passwordMedium.setAttribute("class", "passwordStrength");
      passwordMedium.setAttribute("id", "medium");
      passwordMedium.innerHTML = "Moyen";
      passwordInput.appendChild(passwordMedium);
    }
  }
  passwordStrength();
}

// Pour vérifier les input et les enregistrer s'ils ne sont pas déjà présents dans le storage
function getdata(check) {
  check.preventDefault();

  let username = document.getElementById("username");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("confirmPassword");

  // Vérifier les 2 input password
  if (password.value !== confirmPassword.value) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  // Vérification si le nom d'utilisateur existe déjà
  for (let i = 0; i < localStorage.length; i++) {
    let storedUsername = localStorage.getItem(`username${i}`);
    if (storedUsername === username.value) {
      alert("Ce nom d'utilisateur est déjà pris.");
      return;
    }
  }

  // Vérification si l'email existe déjà
  for (let i = 0; i < localStorage.length; i++) {
    let storedEmail = localStorage.getItem(`email${i}`);
    if (storedEmail === email.value) {
      alert("Cet email est déjà enregistré.");
      return;
    }
  }

  // Enregistrer les informations dans localStorage
  userCount++;
  localStorage.setItem(`username${userCount}`, username.value);
  console.log("Username:", username.value);

  emailCount++;
  localStorage.setItem(`email${emailCount}`, email.value);
  console.log("Email:", email.value);

  passwordCount++;
  localStorage.setItem(`password${passwordCount}`, password.value);
  console.log("Password:", password.value);

  // Afficher un message de confirmation
  alert("Merci pour votre inscription !");
}

// Pour se connecter
function login(checklogin) {
  checklogin.preventDefault();

  let loginUsername = document.getElementById("loginUsername");
  let loginPassword = document.getElementById("loginPassword");
  console.log("Input login utilisateur:", loginUsername.value);
  console.log("Input login password:", loginPassword.value);

  let isUserFound = false;

  for (let i = 0; i < localStorage.length; i++) {
    storedUsername = localStorage.getItem(`username${i}`);
    storedPassword = localStorage.getItem(`password${i}`);
    console.log("Utilisateur:", storedUsername);
    console.log("Password:", storedPassword);

    // Vérifier si username et password sont enregistrés
    if (storedUsername === loginUsername.value) {
      if (storedPassword === loginPassword.value) {
        isUserFound = true;
        alert("Merci pour votre connexion.");
        sessionStorage.setItem("loggedInUsername", storedUsername);
        break;
      } else {
        alert("Mot de passe incorrect.");
        return;
      }
    }
  }

  // Alertes
  if (!isUserFound) {
    alert("Nom d'utilisateur inconnu.");
    return;
  }
}
