function showForm(type) {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('type').value = type;
}

function hideForm() {
    document.getElementById('form-container').style.display = 'none';
}

async function sendEmail(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const type = document.getElementById('type').value;
    
    const data = {
        name,
        email,
        phone,
        message,
        type
    };

    try {
        const response = await fetch('/api/sendTestEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Email envoyé avec succès!');
            hideForm();
        } else {
            alert('Erreur lors de l\'envoi de l\'email: ' + result.error);
        }
    } catch (error) {
        alert('Erreur lors de l\'envoi de l\'email: ' + error.message);
    }
}
