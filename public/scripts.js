document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    const data = {
        name,
        email,
        phone,
        message
    };
    
    try {
        const response = await fetch('/.netlify/functions/SendTestEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert('Email envoyé avec succès');
        } else {
            alert('Erreur lors de l\'envoi de l\'email: ' + result.error);
        }
    } catch (error) {
        alert('Erreur lors de l\'envoi de l\'email: ' + error.message);
    }
});
