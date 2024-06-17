$(document).ready(function() {
    $('#form').on('submit', function(event) {
        event.preventDefault(); 

        var complaintText = $('#complaints').val();
        var meterId = localStorage.getItem('meterId');

        var complaintData = {
            complaint: complaintText,
            meterId: meterId
        };

        if(complaintText == ""){
            alert("Enter your complaint for the submission");
        }else{
            $.ajax({
                url: 'http://localhost:8080/complaints', 
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(complaintData),
                success: function(response) {
                    alert('Complaint submitted successfully: ' + JSON.stringify(response));
                    $('#complaints').val(''); 
                },
                error: function(error) {
                    console.error('Error submitting complaint:', error);
                    alert('Failed to submit complaint. Please try again.');
                }
            });
        }
    });
});
