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

            const consumedMonths = [];

            monthlyData.forEach(function(item) {
                const row = $('<tr>');

                $('<td>').text(months[monthKeys.indexOf(item.month)]).appendTo(row);
                $('<td>').text(`${item.consumption}kwh`).appendTo(row);
                $('<td>').text(item.bill).appendTo(row);

                consumedMonths.push(months[monthKeys.indexOf(item.month)]);

                tableBody.append(row);
            });

            var dropdown = $('#drop');
            dropdown.empty();
            dropdown.append('<option value="">Select Month</option>');

            consumedMonths.forEach(function(con) {
                dropdown.append(`<option value="${con}">${con}</option>`);
            });

            $('#drop').on('change', function(){
                checkDropdowns();
            });

            var dropyear = $('#drop-year');
            dropyear.empty();
            dropyear.append('<option value="">Select Year</option>');
            dropyear.append(`<option value="${2017}">${2017}</option>`);
            dropyear.append(`<option value="${2018}">${2018}</option>`);
            dropyear.append(`<option value="${2019}">${2019}</option>`);
            dropyear.append(`<option value="${2020}">${2020}`).append(`<option value="${2021}">${2021}</option>`);
            dropyear.append(`<option value="${2022}">${2022}</option>`);
            dropyear.append(`<option value="${2023}">${2023}</option>`);
            dropyear.append(`<option value="${2024}">${2024}</option>`);

            $('#drop-year').on('change', function(){
                checkDropdowns();
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

function ISLP(year){
    if((year % 400 == 0) || (year % 100 != 0) && (year % 4 == 0)){
        return 1;
    }
    else{
        return 0;
    }
}

function checkDropdowns() {
    const month = $('#drop').val();
    const year = $('#drop-year').val();

    if (month && year) {
        calendar(month, year);
    }
}

function calendar(month, year){
    const days = {
        "January" : 31,
        "February" : ISLP(year) ? 29 : 28,
        "March" : 31,
        "April" : 30,
        "May" : 31,
        "June" : 30,
        "July" : 31,
        "August" : 31,
        "September" : 30,
        "October" : 31,
        "November" : 30,
        "December" : 31
    };

    $('#calendar').empty();

    let c = 0;

    const calendarBody = $('<div class="calendar-body"></div>');
    const firstDayOfMonth = new Date(year, Object.keys(days).indexOf(month), 1).getDay();
    calendarBody.append('<b>&nbsp;&nbsp; S &nbsp;&nbsp;&nbsp;&nbsp; M  &nbsp;&nbsp;&nbsp;&nbsp; T &nbsp;&nbsp;&nbsp;&nbsp; W &nbsp;&nbsp;&nbsp;&nbsp; T &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; F &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; S &nbsp;</b> <br>');

    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarBody.append('<span class="calendar-day empty"></span>');
        c++;
    }

    for(let i = 1; i <= days[month]; i++){
        calendarBody.append(`<span class="calendar-day">${i}</span> `);
        c += 1;
        if(c == 7){
            c = 0;
            calendarBody.append('<br>');
        }
    }

    $('#calendar').append(calendarBody);

    let history = new Set();

    $('.calendar-day').on('click', function(){
        const selectedDay = $(this).text();
        if (!$(this).hasClass('empty')) {
            const monthIndex = ("0" + (Object.keys(days).indexOf(month) + 1)).slice(-2); 
            const day = ("0" + selectedDay).slice(-2); 
            const formattedDate = `${year}-${monthIndex}-${day}`;
            const meterId = localStorage.getItem('meterId');
            console.log(formattedDate);
            if (!history.has(formattedDate)) {
                history.add(formattedDate);
                $.ajax({
                    url: `http://localhost:8080/billing/dates/${formattedDate}/${meterId}`,
                    type: 'GET',
                    dataType: 'json',
                    success: function(data){
                        const dateTableBody = $('#dateTable tbody');
                        const row = $('<tr>');

                        $('<td>').text(`${data.date}`).appendTo(row);
                        $('<td>').text(`${data.consumption}`).appendTo(row);
                        $('<td>').text(`${data.bill} rs`).appendTo(row);

                        dateTableBody.append(row);
                    },
                    error: function(error){
                        alert("Data is not available for the selected date");
                        console.error("Error fetching data for the selected date:", error);
                    }
                });
            }
        }
    });
    $('#reset').click(function(event){
        const dateTableBody = $('#dateTable tbody');
        dateTableBody.empty();
        history = new Set();
    })
}
