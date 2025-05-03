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
  