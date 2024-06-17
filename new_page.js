$(document).ready(function() {
    $('#feedbackForm').on('submit', function(event) {
        event.preventDefault();  
        
        const radioGroups = ['overallSatisfaction', 'easeOfUse', 'accuracy', 'customerService'];
        const feed = {};

        const meterId = localStorage.getItem('meterId');
        
        radioGroups.forEach(function(groupName) {
            const selectedValue = $(`input[name="${groupName}"]:checked`).val();
            feed[groupName] = selectedValue ? selectedValue : null;
        });
        feed['meterId'] = meterId;

        $.ajax({
            type: 'GET',
            url: `http://localhost:8080/consumers/feedback/${feed.meterId}`,
            contentType: 'application/json',
            success: function(response) {
                if (response && response.length > 0) {
                    alert("We already have your feedback for your meter");
                } else {
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:8080/consumers/feedback',
                        contentType: 'application/json',
                        data: JSON.stringify(feed),
                        success: function(response){
                            alert(response);
                        },
                        error: function(error){
                            alert(error);
                        }
                    });
                }
            },
            error: function(error){
                alert(error);
            }
        });
    });
});
