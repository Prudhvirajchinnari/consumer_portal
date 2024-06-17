$(document).ready(function() {
    const meterId = localStorage.getItem('meterId');

    if (!meterId) {
        alert("Meter ID not found. Please log in again.");
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/billing',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            const aggregatedData = aggregateDataByMeterNumber(data);

            const tableBody = $('#billingTable tbody');
            tableBody.empty();  

            const filteredData = aggregatedData.filter(item => item.meter_number === meterId);

            filteredData.forEach(function(item) {
                const row = $('<tr>');

                $('<td>').text(item.meter_number).appendTo(row);
                $('<td>').text(item.totalBill).appendTo(row);

                tableBody.append(row);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error fetching billing data:", error);
        }
    });
});

function aggregateDataByMeterNumber(data) {
    const aggregatedData = {};

    data.forEach(function(item) {
        if (aggregatedData[item.meter_number]) {
            aggregatedData[item.meter_number].totalBill += parseFloat(item.bill);
        } else {
            aggregatedData[item.meter_number] = {
                meter_number: item.meter_number,
                totalBill: parseFloat(item.bill)
            };
        }
    });

    return Object.values(aggregatedData);
}
