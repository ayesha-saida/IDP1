document
  .getElementById('contact-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
      alert(
        'Thank you for reaching out! Our team will get back to you shortly.'
      );
      // Optionally, you can send the form data to a server here using AJAX or fetch.
      document.getElementById('contact-form').reset();
    } else {
      alert('Please fill out all fields before submitting.');
    }
  });
