document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-container form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // Show input error messages
    function showError(input, message) {
        const formControl = input.parentElement;
        input.classList.add("border-2")
        input.classList.add("border-red-500")
        formControl.className = 'form-control w-full error';
        let small = formControl.querySelector('small');
        if (!small) {
            small = document.createElement('small');
            small.className = "text-red-500"
            formControl.appendChild(small);
        }
        small.innerText = message;
    }

    // Show success colour
    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control w-full success';
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
        } else {
            showError(input, 'Email is invalid');
        }
    }

    // Check required fields
    function checkRequired(inputArr) {
        inputArr.forEach(function (input) {
            if (input.value.trim() === '') {
                showError(input, `${getFieldName(input)} is required`);
            } else {
                showSuccess(input);
            }
        });
    }

    // Check input length
    function checkLength(input, min, max) {
        if (input.value.length < min) {
            showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        } else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} must be less than ${max} characters`);
        } else {
            showSuccess(input);
        }
    }

    // Get field name
    function getFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
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

        checkRequired([username, email, password]);
        checkLength(username, 3, 15);
        checkLength(password, 3, 25);
        checkEmail(email);
        form.submit()
    });
});
