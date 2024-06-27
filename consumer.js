$(document).ready(function() {
    $('#consumerForm').on('submit', function(event) {
        event.preventDefault();  

        const user = {
            username: $('#username').val(),
            password: $('#password').val(),
            meterId: $('#meterId').val()
        };

        // to add a new consumer but not for logging a consumer in
        // $.ajax({
        //     type: 'POST',
        //     url: 'http://localhost:8080/consumers',
        //     contentType: 'application/json',
        //     data: JSON.stringify(user),
        //     success: function(response){
        //         alert(response);
        //     },
        //     error: function(error) {
        //         console.error('Error:', error);
        //     }
        // });

        $.ajax({
            type: 'GET',
            url: `http://localhost:8080/consumers/${user.meterId}`,
            contentType: 'application/json',
            success: function(response) {
                
                if (response.username.trim() === user.username.trim() &&
                response.password.trim() === user.password.trim() &&
                response.meterId.trim() === user.meterId.trim()) {
                    localStorage.setItem('meterId', user.meterId);
                    localStorage.setItem('username', user.username);
                    window.location.href = "new_page.html";  
                } else {
                    alert("Invalid details");
                }
            },
            error: function(error) {
                console.error('Error:', error);
                alert("error");
            }
        });
    });
});
