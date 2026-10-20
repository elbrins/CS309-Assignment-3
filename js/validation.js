const form = document.getElementById("regForm");
const successBox = document.getElementById("successBox");

const inputs = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    confirm: document.getElementById("confirm"),
    age: document.getElementById("age")
};

const rules = {
    name(value) {
        if (value === "") return "Name is required.";
        if (value.length < 3) return "Name must be at least 3 characters.";
        if (!/^[A-Za-z\u0600-\u06FF\s'-]+$/.test(value)) return "Name can only contain letters.";
        return "";
    },
    email(value) {
        if (value === "") return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email like name@example.com.";
        return "";
    },
    password(value) {
        if (value === "") return "Password is required.";
        if (value.length < 8) return "Password must be at least 8 characters.";
        if (!/\d/.test(value)) return "Password must contain at least one number.";
        return "";
    },
    confirm(value) {
        if (value === "") return "Please confirm your password.";
        if (value !== inputs.password.value) return "Passwords do not match.";
        return "";
    },
    age(value) {
        if (value === "") return "Age is required.";
        const age = Number(value);
        if (!Number.isInteger(age)) return "Age must be a whole number.";
        if (age < 16 || age > 100) return "Age must be between 16 and 100.";
        return "";
    }
};

function checkField(key) {
    const input = inputs[key];
    const isPassword = key === "password" || key === "confirm";
    const value = isPassword ? input.value : input.value.trim();
    const message = rules[key](value);

    document.getElementById(key + "-error").textContent = message;
    if (message) {
        input.setAttribute("aria-invalid", "true");
    } else {
        input.removeAttribute("aria-invalid");
    }
    return message === "";
}

form.addEventListener("submit", event => {
    event.preventDefault();
    successBox.hidden = true;

    let allGood = true;
    let firstBad = null;

    for (const key in inputs) {
        if (!checkField(key)) {
            allGood = false;
            if (!firstBad) firstBad = inputs[key];
        }
    }

    if (!allGood) {
        firstBad.focus();
        return;
    }

    successBox.hidden = false;
    form.reset();
});

for (const key in inputs) {
    inputs[key].addEventListener("blur", () => checkField(key));
    inputs[key].addEventListener("input", () => {
        if (inputs[key].hasAttribute("aria-invalid")) checkField(key);
    });
}

inputs.password.addEventListener("input", () => {
    if (inputs.confirm.value !== "") checkField("confirm");
});
