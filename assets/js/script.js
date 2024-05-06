// JavaScript to handle form navigation
const form = document.getElementById("multiStepForm");
const steps = Array.from(form.querySelectorAll(".step"));

let currentStep = 0;

const updateStepVisibility = () => {
  steps.forEach((step, index) => {
    if (index === currentStep) {
      step.classList.remove("hidden");
    } else {
      step.classList.add("hidden");
    }
  });
};

const updateProgressBar = () => {
  const progressBarInner = document.querySelector(".progress-bar-inner");
  const totalSteps = steps.length;
  const completedSteps = currentStep + 1;
  const percentage = (completedSteps / totalSteps) * 100;
  progressBarInner.style.width = `${percentage}%`;
  progressBarInner.textContent = `${percentage}%`;
};

updateProgressBar();

const goToNextStep = () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateStepVisibility();
    updateProgressBar();
  }
};

// Event listeners for radio buttons
form.querySelectorAll("input[type=radio]").forEach((radio) => {
  radio.addEventListener("click", () => {
    setTimeout(() => {
      goToNextStep();
    }, 1000);
  });
});
