const overlay = document.getElementById("overlay");

function toggleForm() {
    overlay.style.display = overlay.style.display === "none" || overlay.style.display === "" ? "flex" : "none";
}

overlay.addEventListener("click", function(e) {
  if (e.target === overlay) {
    overlay.style.display = "none"; // cerrar
  }
});
