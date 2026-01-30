const overlay = document.getElementById("overlay");
const overlay1 = document.getElementById("overlay1");

function toggleForm() {
  overlay.style.display = overlay.style.display === "none" || overlay.style.display === "" ? "flex" : "none";
}

overlay.addEventListener("click", function (e) {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});

document.querySelectorAll('.btn-editar').forEach(btn => {
  btn.addEventListener('click', async () => {

    const id = btn.dataset.id;

    const res = await fetch(`/transportistas/update/${id}`);
    //alert(res);
    const data = await res.json();

    // Rellenar formulario
    document.getElementById('up_id').value = data.tr_id;
    document.getElementById('up_nombre').value = data.tr_nombre;
    document.getElementById('up_tarifa').value = data.tr_tarifa;

    const modal = new bootstrap.Modal(document.getElementById('modalTransportistas'));
    modal.show();

  });
});


document.getElementById("buscar").addEventListener("keyup", function () {
  let filtro = this.value.toLowerCase();
  let filas = document.querySelectorAll("#tablaColab tbody tr");

  filas.forEach(fila => {
    let textoFila = fila.textContent.toLowerCase();
    if (textoFila.includes(filtro)) {
      fila.style.display = "";   // Mostrar
    } else {
      fila.style.display = "none"; // Ocultar
    }
  });
});

