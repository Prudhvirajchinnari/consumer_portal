$(document).ready(function() {
    $('#complaintForm').on('submit', function(event) {
        event.preventDefault(); 

        var complaintText = $('#complaints').val();
        var meterId = localStorage.getItem('meterId');

        var complaintData = {
            complaint: complaintText,
            meterId: meterId
        };

        if(complaintText === "") {
            alert("Enter your complaint for the submission");
        } else {
            $.ajax({
                url: 'http://localhost:8080/complaints',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(complaintData),
                success: function(response) {
                    alert('Complaint submitted successfully');
                    $('#complaints').val(''); 
                    fetchComplaints(meterId);
                },
                error: function(error) {
                    console.error('Error submitting complaint:', error);
                    alert('Failed to submit complaint. Please try again.');
                }
            });
        }
    });

    function fetchComplaints(meterId) {
        $.ajax({
            url: `http://localhost:8080/complaints/meter/${meterId}`,
            type: 'GET',
            contentType: 'application/json',
            success: function(response) {
                var dropdown = $('#drop');
                dropdown.empty();
                dropdown.append('<option value="">Select Complaint ID</option>');
                response.forEach(function(res) {
                    dropdown.append(`<option value="${res.id}">${res.id}</option>`);
                });
            },
            error: function(error) {
                console.error('Failed to fetch complaints corresponding to meterId:', error);
            }
        });
    }

    $('#drop').on('change', function() {
        var id = $(this).val();
        if (id) {
            $.ajax({
                url: `http://localhost:8080/complaints/${id}`,
                type: 'GET',
                contentType: 'application/json',
                success: function(response) {
                    $('#response').text(response.response);
                    $('#storedComplaint').text(response.complaint);
                },
                error: function(error) {
                    console.error('Error fetching the response:', error);
                    alert('Failed to fetch response. Please try again.');
                }
            });
        } else {
            $('#response').text('');
            $('#storedComplaint').text('');
        }
    });

    var meterId = localStorage.getItem('meterId');
    if (meterId) {
        fetchComplaints(meterId);
    }
});
