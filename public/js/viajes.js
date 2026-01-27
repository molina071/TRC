document.getElementById('transportista').addEventListener('change', function () {
    const tarifa = this.options[this.selectedIndex].getAttribute('data-tarifa');
    document.getElementById('tarifa').value = tarifa;
});


document.getElementById('sucursalSelect').addEventListener('change', function () {
   
});


  document.getElementById('sucursalSelect').addEventListener('change', async function () {
                const sucursalId = this.value;
                const response = await fetch(`/viajes/${sucursalId}`);
                const colaboradores = await response.json();

                const selectColab = document.getElementById('colaboradorSelect');
                selectColab.innerHTML = '';

                colaboradores.forEach(c => {
                    const option = document.createElement('option');
                    option.value = c.cl_cedula;
                    option.textContent = c.cl_nombre; 
                    selectColab.appendChild(option);
                });

                //RESET AL MOMENTO DE CAMBIAR DE SUCURSAL.
                document.getElementById('distanciaColab').value = null;
                acum = 0;
                document.getElementById('tarifa').value = null;
                costoViaje = 0;
                document.getElementById('costoViaje').value = null;
                document.getElementById('transportista').selectedIndex = 0;
                

            });

            let acum = 0;


            document.getElementById('colaboradorSelect').addEventListener('change', async function () {

                const cedula = this.value;
                const sucursalId = document.getElementById('sucursalSelect').value;

                if (cedula && sucursalId) {
                    const response = await fetch(`/viajes/distancia/${cedula}/${sucursalId}`);
                    const data = await response.json();
                    acum = acum + data.distancia;
                    document.getElementById('distanciaColab').value = acum || '0';

                } else {
                    document.getElementById('distanciaColab').value = '';
                    document.getElementById('costoViaje').value = '';
                }
            });

            let costoViaje = 0;
            function calcularCostoViaje(params) {
                const distancia = parseFloat(document.getElementById('distanciaColab').value) || 0;
                const tarifaSelect = parseInt(document.getElementById('tarifa').value) || 0;
                costoViaje = distancia * tarifaSelect;
                document.getElementById('costoViaje').value = costoViaje.toFixed(2);
            }