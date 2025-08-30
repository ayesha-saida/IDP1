document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, index) => {
    // Optional: Add smooth scroll or animations
    step.addEventListener('click', function () {
      alert(`You clicked on step ${index + 1}`);
    });
  });
});
