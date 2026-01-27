
$(document).ready(function () {
    const table = $('#miTabla').DataTable();

    // Filtro personalizado por rango de fechas
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        const fechaInicio = $('#fechaInicio').val();
        const fechaFin = $('#fechaFin').val();
        const fechaColumna = data[1]; // columna de fecha (índice 1)

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

    // Redibujar tabla cuando cambien los filtros
    $('#fechaInicio, #fechaFin').on('change', function () {
        table.draw();
    });
});
