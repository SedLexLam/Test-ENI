window.onload = init;

function init() {
  document.getElementById("userForm").addEventListener("submit", getdata);
}

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

    localStorage.setItem("username", username.value);
    console.log("Username:", username.value);
  
    localStorage.setItem("email", email.value);
    console.log("Email:", email.value);
  
    localStorage.setItem("password", password.value);
    console.log("Password:", password.value);
    alert("Merci pour votre inscription !");
  
}
