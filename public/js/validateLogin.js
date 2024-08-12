document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-container form');
    const email = document.querySelector('input[name="email"]');
    const password = document.querySelector('input[name="password"]');

    // Show input error messages
    function showError(input, message) {
        const formControl = input.parentElement;
        input.classList.add('border-2', 'border-red-500');
        formControl.className = 'form-control w-full error';
        let small = formControl.querySelector('small');
        if (!small) {
            small = document.createElement('small');
            small.className = 'text-red-500';
            formControl.appendChild(small);
        }
        small.innerText = message;
    }

    // Show success color
    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control w-full success';
        input.classList.remove('border-2', 'border-red-500');
        let small = formControl.querySelector('small');
        if (small) {
            small.innerText = '';
        }
    }

    // Check email is valid
    function checkEmail(input) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(input.value.trim())) {
            showSuccess(input);
            return false;
        } else {
            showError(input, 'Email is invalid');
            return true;
        }
    }

    // Check required fields
    function checkRequired(inputArr) {
        let hasError = false;
        inputArr.forEach(function (input) {
            if (input.value.trim() === '') {
                showError(input, `${getFieldName(input)} is required`);
                hasError = true;
            } else {
                showSuccess(input);
            }
        });
        return hasError;
    }

    // Check input length
    function checkLength(input, min, max) {
        if (input.value.length < min) {
            showError(input, `${getFieldName(input)} must be at least ${min} characters`);
            return true;
        } else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} must be less than ${max} characters`);
            return true;
        } else {
            showSuccess(input);
            return false;
        }
    }

    // Get field name
    function getFieldName(input) {
        return input.name.charAt(0).toUpperCase() + input.name.slice(1);
    }

    // Clear previous errors
    function clearErrors() {
        const formControls = form.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.className = 'form-control w-full';
            let small = control.querySelector('small');
            if (small) {
                small.innerText = '';
            }
        });
    }

    // Event listeners
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors(); // Clear previous errors

        const hasRequiredError = checkRequired([email, password]);
        const hasLengthError = checkLength(password, 3, 25);
        const hasEmailError = checkEmail(email);

        // If there are errors, prevent form submission
        if (hasRequiredError || hasLengthError || hasEmailError) {
            console.log('Validation failed. Form not submitted.');
        } else {
            // If no errors, allow form submission
            console.log('Validation succeeded. Form can be submitted.');
            form.submit();
        }
    });
});
