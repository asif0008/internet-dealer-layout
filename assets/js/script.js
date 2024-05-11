// JavaScript to handle form navigation
const form = document.getElementById("multiStepForm");
const steps = Array.from(form.querySelectorAll(".step"));
const backBtn = document.getElementById('backBtn');

let currentStep = 0;
let formData = {};

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

    if(currentStep == 5) {
        console.log('zipcode');
        const zipcode = document.getElementById('zipcode');
        zipcode.addEventListener('keydown', (e) => {

            const keyCode = event.keyCode || event.which;

            // Allow only numeric keys (0-9) and specific control keys (e.g., backspace, delete, arrow keys)
            const allowedKeys = [8, 9, 37, 39, 46]; // Backspace, Tab, Left arrow, Right arrow, Delete
            if ((keyCode < 48 || keyCode > 57) && !allowedKeys.includes(keyCode)) {
                // Prevent default action (typing)
                e.preventDefault();
            }


            setTimeout(() => {
                const zipCodeValue = e.target.value;
                [...formData['Zipcode'] = zipCodeValue];
            }, 500);
        })
    }
  }
};

const goToPreviousStep = () => {
    if(currentStep > 0) {
        currentStep--;
        updateStepVisibility();
        updateProgressBar();
    }
}

backBtn.addEventListener('click', () => {
    setTimeout(() => {
        goToPreviousStep();
    }, 500);
})

// Event listeners for radio buttons
form.querySelectorAll(".go-to-next").forEach((btn) => {
    btn.addEventListener("click", (e) => {
    setTimeout(() => {
      goToNextStep();
    }, 500);

    const name = e.target.id;
    const value = e.target.value;

    formData[name] = value;
    console.log('formdata:', formData);

  });
});


