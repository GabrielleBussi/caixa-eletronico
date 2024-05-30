$(document).ready(function() {
    $('#withdraw-form').submit(function(e) {
        e.preventDefault();
        const clienteId = $('#clienteId').val();
        const amount = $('#amount').val();

        $.ajax({
            url: 'http://localhost:3000/api/sacar',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ clienteId: clienteId, valor: parseInt(amount, 10) }),
            success: function(data) {
                let resultHtml = '';
                if (data.notas) {
                    resultHtml = `<h4>Notes Delivered:</h4>
                                  <p>100: ${data.notas[100] || 0}</p>
                                  <p>50: ${data.notas[50] || 0}</p>
                                  <p>20: ${data.notas[20] || 0}</p>
                                  <p>10: ${data.notas[10] || 0}</p>`;
                } else {
                    resultHtml = `<p class="text-danger">${data.message}</p>`;
                }
                $('#result').html(resultHtml);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                $('#result').html(`<p class="text-danger">An error occurred</p>`);
            }
        });
    });
});
