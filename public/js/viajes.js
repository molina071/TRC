document.getElementById('transportista').addEventListener('change', function () {
    const tarifa = this.options[this.selectedIndex].getAttribute('data-tarifa');
    document.getElementById('tarifa').value = tarifa;
});


document.getElementById('sucursalSelect').addEventListener('change', function () {
   
});
