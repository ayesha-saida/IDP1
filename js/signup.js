const form = document.querySelector('form');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default submission until we check everything

    // Get form field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const location = document.getElementById('location').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Name validation
    if (name === "") {
      alert("Please enter your name.");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone validation (11 digits)
    const phonePattern = /^[0-9]{11}$/;
    if (!phonePattern.test(phone)) {
      alert("Please enter a valid phone number (11 digits).");
      return;
    }

    // Location validation
    if (location === "") {
      alert("Please select your location.");
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Password strength validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
// Save to localStorage
const userData = {
    name: name,
    email: email,
    phone: phone,
    location: location,
    password: password
  };

  localStorage.setItem('user', JSON.stringify(userData));

// ✅ All validations passed
  alert("Account created successfully!");
  window.location.href = 'buyerLogin.html'; // Redirect to login page
   
  });

