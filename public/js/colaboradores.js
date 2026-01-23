const overlay = document.getElementById("overlay");
const overlay1 = document.getElementById("overlay1");

function toggleForm() {
  overlay.style.display = overlay.style.display === "none" || overlay.style.display === "" ? "flex" : "none";
}

overlay.addEventListener("click", function (e) {
  if (e.target === overlay) {
    overlay.style.display = "none"; // cerrar
  }
});


