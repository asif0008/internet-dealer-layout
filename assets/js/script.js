// JavaScript to handle form navigation
const form = document.getElementById("multiStepForm");
const steps = Array.from(form.querySelectorAll(".step"));
const backBtn = document.getElementById('backBtn');
const progressContainer = document.querySelector('.progress-container');
const loaderAfterFifthStep = document.querySelector('.loader-after-fifth-step');

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
    // Store form data from current step
    const stepData = collectStepData(steps[currentStep]);
    Object.assign(formData, stepData);


    if(currentStep === 5) {
        loaderAfterFifthStep.classList.remove('hidden');
        progressContainer.classList.add('hidden');
        backBtn.classList.add('hidden');

        const internetSpeed = loaderAfterFifthStep.querySelector('.internet-speed');
        const internetUsage = loaderAfterFifthStep.querySelector('.internet-usage');
        const time = loaderAfterFifthStep.querySelector('.time');

        internetSpeed.textContent = formData.internetSpeed;
        internetUsage.textContent = formData.internetUsage;
        time.textContent = formData.time;


        setTimeout(() => {
            loaderAfterFifthStep.classList.add('hidden');
            progressContainer.classList.remove('hidden');
            backBtn.classList.remove('hidden');
        }, 4000);
    }

    currentStep++;
    updateStepVisibility();
    updateProgressBar();
  }
};

const goToPreviousStep = () => {
  if(currentStep > 0) {
    // Remove form data for current step
    delete formData[steps[currentStep].dataset.set];

    currentStep--;
    updateStepVisibility();
    updateProgressBar();
  }
};

backBtn.addEventListener('click', () => {
  goToPreviousStep();
});

// Event listeners for radio buttons
form.querySelectorAll(".go-to-next").forEach((btn) => {
  btn.addEventListener("click", () => {
    setTimeout(() => {
        goToNextStep();
    }, 500);
    // console.log('form-data:', formData);
  });
});

// Function to collect data from a step
const collectStepData = (step) => {
  const stepData = {};
  const inputs = step.querySelectorAll('input');

  inputs.forEach(input => {
    if (input.type === 'radio' && input.checked) {
      stepData[input.name] = input.value;
    } else if (input.type === 'tel' || input.type === 'text' || input.type === 'email') {
      stepData[input.name] = input.value;
    }
  });

  return stepData;
};
