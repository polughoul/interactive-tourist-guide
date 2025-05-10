// This script handles the admin login form submission.
// It prevents the default form submission, checks the entered password,
// and if correct, sets an admin flag in localStorage and redirects to the main page.
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const error = document.getElementById('error');
  
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      window.location.href = 'index.html';
    } else {
      error.textContent = 'Incorrect password. Please try again.';
    }
  });
  