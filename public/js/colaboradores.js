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

    const res = await fetch(`/colaboradores/update/${id}`);
    const data = await res.json();

    // Rellenar formulario
    document.getElementById('up_cedula').value = data.vista.cl_cedula;
    document.getElementById('up_nombre').value = data.vista.cl_nombre;
    document.getElementById('up_apellido').value = data.vista.cl_apellido;
    document.getElementById('up_direccion').value = data.vista.cl_direccion;
    document.getElementById('up_distancia').value = 0;

    const selectSucursal = document.getElementById('up_sucursal');

    selectSucursal.innerHTML = "";

  
    const headerOption = document.createElement('option');
    headerOption.textContent = "Sucursales en las que trabaja..."; 
    headerOption.value = "";       
    headerOption.disabled = true;  
    headerOption.selected = true; 
    selectSucursal.appendChild(headerOption);


    data.results.forEach(result => {
      const option = document.createElement('option');
      option.value = result.sc_id;
      option.textContent = result.sc_nombre;
      selectSucursal.appendChild(option);
    });

    if (data.results.length > 0) {
      selectSucursal.value = data.results[0].sc_nombre;
    }

    const modal = new bootstrap.Modal(document.getElementById('modalColaborador'));
    modal.show();
  });
});

document.getElementById('up_sucursal').addEventListener('change', async function () {
  const sucursalId = this.value;
  const cedula = document.getElementById('up_cedula').value;

  if (cedula && sucursalId) {
    ``
    const response = await fetch(`/viajes/distancia/${cedula}/${sucursalId}`);
    const data = await response.json();
    document.getElementById('up_distancia').value = data.distancia || '0';

  } else {
    document.getElementById('up_distancia').value = '';
    document.getElementById('costoViaje').value = '';
  }
});
