$(document).ready(function() {
    const meterId = localStorage.getItem('meterId');

    if (!meterId) {
        alert("Meter ID not found. Please log in again.");
        return;
    }

    $.ajax({
        url: 'http://127.0.0.1:8080/billing',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log("Data fetched successfully:", data); 
            const filteredData = filterDataByMeterId(data, meterId);
            console.log("Filtered Data:", filteredData); 

            const aggregatedData = aggregateDataByMeterNumberAndStatus(filteredData);
            console.log("Aggregated Data:", aggregatedData); 

            generateBarChart(aggregatedData);

            const monthlyData = aggregateDataByMonth(filteredData);
            generateLineChart(monthlyData);
        },
        error: function(xhr, status, error) {
            console.error("Error fetching billing data:", error);
        }
    });

    $.ajax({
        url: 'http://localhost:8080/billing',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            const monthlyData = aggregateDataByMonth1(data, meterId);

            const tableBody = $('#billingTable tbody');
            tableBody.empty();  

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const monthKeys = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

            monthlyData.forEach(function(item) {
                const row = $('<tr>');

                $('<td>').text(months[monthKeys.indexOf(item.month)]).appendTo(row);
                $('<td>').text(`${item.consumption}kwh`).appendTo(row);

                tableBody.append(row);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error fetching billing data:", error);
        }
    });
});

function filterDataByMeterId(data, meterId) {
    return data.filter(item => item.meter_number === meterId);
}

function aggregateDataByMeterNumberAndStatus(data) {
    const aggregatedData = {
        active: {
            meter_number: "",
            totalConsumption: 0,
            status: "active"
        },
        inactive: {
            meter_number: "",
            totalConsumption: 0,
            status: "inactive"
        }
    };

    data.forEach(function(item) {
        if (item.status === 'active') {
            if (!aggregatedData.active.meter_number) {
                aggregatedData.active.meter_number = item.meter_number;
            }
            aggregatedData.active.totalConsumption += parseFloat(item.consumption);
        } else {
            if (!aggregatedData.inactive.meter_number) {
                aggregatedData.inactive.meter_number = item.meter_number;
            }
            aggregatedData.inactive.totalConsumption += parseFloat(item.consumption);
        }
    });

    return [aggregatedData.active, aggregatedData.inactive];
}

function aggregateDataByMonth(data) {
    const monthlyData = {
        'jan': 0,
        'feb': 0,
        'mar': 0,
        'apr': 0,
        'may': 0,
        'jun': 0,
        'jul': 0,
        'aug': 0,
        'sep': 0,
        'oct': 0,
        'nov': 0,
        'dec': 0
    };

    data.forEach(function(item) {
        monthlyData[item.month] += parseFloat(item.consumption);
    });

    return monthlyData;
}

function generateBarChart(data) {
    const chartData = data.map(function(item) {
        return {
            x: item.meter_number + ' (' + item.status + ')',
            y: item.totalConsumption
        };
    });

    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        series: [{
            name: 'Total Consumption',
            data: chartData
        }],
        xaxis: {
            type: 'category'
        }
    };

    const chart = new ApexCharts(document.querySelector("#barChart"), options);
    chart.render();
}

function generateLineChart(data) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthKeys = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    const monthlyConsumption = monthKeys.map(function(month) {
        return data[month] || 0;
    });

    const options = {
        chart: {
            type: 'line',
            height: 350
        },
        series: [
            {
                name: 'Monthly Consumption',
                data: monthlyConsumption
            }
        ],
        xaxis: {
            categories: months
        },
        title: {
            text: 'Monthly Consumption',
            align: 'center',
            style: {
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#263238'
            }
        }
    };

    const chart = new ApexCharts(document.querySelector("#lineChart"), options);
    chart.render();
}

function aggregateDataByMonth1(data, meterId) {
    const monthlyData = {};

    data.forEach(function(item) {
        if (item.meter_number === meterId) {
            if (!monthlyData[item.month]) {
                monthlyData[item.month] = {
                    month: item.month,
                    consumption: 0
                };
            }
            monthlyData[item.month].consumption += parseFloat(item.consumption);
        }
    });

    return Object.values(monthlyData);
}

