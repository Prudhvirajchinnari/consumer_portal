$(document).ready(function() {
    const meterId = localStorage.getItem('meterId');

    if (!meterId) {
        alert("Meter ID not found. Please log in again.");
        return;
    }

    $('h1').text(`Billing Data for Meter Id: ${meterId}`);

    $.ajax({
        url: 'http://localhost:8080/billing',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            const monthlyData = aggregateDataByMonth(data, meterId);

            const tableBody = $('#billingTable tbody');
            tableBody.empty();  

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const monthKeys = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

            monthlyData.forEach(function(item) {
                const row = $('<tr>');

                $('<td>').text(months[monthKeys.indexOf(item.month)]).appendTo(row);
                $('<td>').text(`${item.consumption}kwh`).appendTo(row);
                $('<td>').text(item.bill).appendTo(row);

                tableBody.append(row);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error fetching billing data:", error);
        }
    });
});

function aggregateDataByMonth(data, meterId) {
    const monthlyData = {};

    data.forEach(function(item) {
        if (item.meter_number === meterId) {
            if (!monthlyData[item.month]) {
                monthlyData[item.month] = {
                    month: item.month,
                    consumption: 0,
                    bill: 0
                };
            }
            monthlyData[item.month].consumption += parseFloat(item.consumption);
            monthlyData[item.month].bill += parseFloat(item.bill);
        }
    });

    return Object.values(monthlyData);
}
