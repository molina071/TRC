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



  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.addEventListener('click', async () => {

      const id = btn.dataset.id;

      const res = await fetch(`/sucursales/update/${id}`);
      //alert(res);
      const data = await res.json();

      // Rellenar formulario
      document.getElementById('up_id').value = data.sc_id;
      document.getElementById('up_nombre').value = data.sc_nombre;
      document.getElementById('up_direccion').value = data.sc_direccion;

      const modal = new bootstrap.Modal(document.getElementById('modalSucursales'));
      modal.show();

    });
  });





