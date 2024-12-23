import { WEBSITE_PASSWORD } from "$env/static/private";
function checkPassword() {
    alert("checkPassword");
    const pwd = document.getElementById("pwd").value;
    if (pwd === WEBSITE_PASSWORD) {
        window.location.href = "/menue";
    } else {
        alert("Falsches Passwort");
    }
}