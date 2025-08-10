document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const enteredEmail = document.getElementById('email').value.trim();
  const enteredPassword = document.getElementById('password').value;

  const storedUser = localStorage.getItem('user');
  console.log(storedUser);
  if (!storedUser) {
    alert('No registered user found. Please sign up first.');
    return;
  }

  const user = JSON.parse(storedUser);
  console.log(user);

  // Match email and password
  if (
    enteredEmail.toLowerCase() === user.email.toLowerCase() &&
    enteredPassword === user.password
  ) {
    alert('Login successful!');
    window.location.href = 'home.html'; // ✅ Change to your dashboard/home page
  } else {
    alert('Invalid email or password.');
  }
});
