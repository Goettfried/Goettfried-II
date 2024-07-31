document.addEventListener("DOMContentLoaded", function() {
    const formContainer = document.getElementById("form-container");
    const contactForm = document.getElementById("contact-form");

    window.showForm = function(type) {
      document.getElementById("type").value = type;
      formContainer.style.display = "block";
    };

    window.hideForm = function() {
      formContainer.style.display = "none";
    };

    window.sendEmail = function(event) {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (response.ok) {
          alert("Email envoyé avec succès !");
          contactForm.reset();
          hideForm();
        } else {
          return response.text().then(text => { throw new Error(text) });
        }
      })
      .catch(error => {
        alert("Erreur lors de l'envoi de l'email: " + error.message);
      });
    };
});
