$(document).ready(function () {
    const table = $('#miTabla').DataTable({
        paging: true
    });

    // Filtro personalizado por rango de fechas
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        const fechaInicio = $('#fechaInicio').val();
        const fechaFin = $('#fechaFin').val();
        const fechaColumna = data[5];

        if (!fechaInicio && !fechaFin) {
            return true; // si no hay filtros, mostrar todo
        }

        const fecha = new Date(fechaColumna);
        const inicio = fechaInicio ? new Date(fechaInicio) : null;
        const fin = fechaFin ? new Date(fechaFin) : null;

        if ((inicio === null || fecha >= inicio) && (fin === null || fecha <= fin)) {
            return true;
        }
        return false;
    });

    actualizarCosto();

    $('#fechaInicio, #fechaFin').on('change', function () {
        table.draw();
        actualizarCosto();
    });


    function actualizarCosto() {
        var total = table.column(3, { search: 'applied' }).data().reduce(function (a, b) {
            return parseFloat(String(a).replace(/[^0-9.-]/g, '')) + parseFloat(String(b).replace(/[^0-9.-]/g, ''));
        }, 0);

        $('#totalCosto').text(total.toFixed(2));
    };

    $('#btnLimpiar').on('click', function () {
        $('#fechaInicio').val('');
        $('#fechaFin').val('');
        $('#totalCosto').val('0.00');
        table.draw();
        actualizarCosto();
    });
});