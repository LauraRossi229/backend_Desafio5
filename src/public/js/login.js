// public/js/login.js

document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
  
    if (userData) {
      const welcomeMessage = document.createElement("h2");
      welcomeMessage.textContent = `Bienvenido, ${userData.first_name} ${userData.last_name}`;
      document.body.appendChild(welcomeMessage);
    }
  });
  