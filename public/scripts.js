function showForm(type) {
    document.getElementById('type').value = type;
    document.getElementById('form-container').style.display = 'block';
}

function hideForm() {
    document.getElementById('form-container').style.display = 'none';
}

async function sendEmail(event) {
    event.preventDefault();
    
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    const jsonData = {};
    
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    try {
        const response = await fetch('/.netlify/functions/SendTestEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (response.ok) {
            alert('Email envoyé avec succès');
        } else {
            const errorData = await response.json();
            alert(`Erreur lors de l'envoi de l'email: ${errorData.message}`);
        }
    } catch (error) {
        alert(`Erreur lors de l'envoi de l'email: ${error.message}`);
    }
}

function toggleMusic() {
    const music = document.getElementById('music');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}
