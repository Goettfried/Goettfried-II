document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      type: 'contact' 
    };
  
    fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      alert(`Erreur lors de l'envoi de l'email: ${error.message}`);
    });
  });  
