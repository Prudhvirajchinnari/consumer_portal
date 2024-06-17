$(document).ready(function() {
    $('#Req_new_con').on('submit', function(event) {
        event.preventDefault();  

        const user = {
            // requestid: $('#requestId').val(),
            name: $('#username').val(),
            password: $('#password').val(),
            Address: $('#address').val()
        };

        
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/consumers',
            contentType: 'application/json',
            data: JSON.stringify(user),
            success: function(response){
                alert(response);
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });

    });
});
