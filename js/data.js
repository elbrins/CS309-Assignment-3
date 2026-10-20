const people = [
    { name: "Ahmed Hassan", age: 24, city: "Cairo" },
    { name: "Sara Ali", age: 21, city: "Giza" },
    { name: "Omar Khaled", age: 29, city: "Alexandria" },
    { name: "Mona Ibrahim", age: 33, city: "Mansoura" },
    { name: "Youssef Adel", age: 19, city: "Cairo" },
    { name: "Nour Samir", age: 26, city: "Tanta" },
    { name: "Hana Mostafa", age: 22, city: "Aswan" },
    { name: "Karim Fathy", age: 31, city: "Giza" },
    { name: "Laila Nabil", age: 27, city: "Luxor" },
    { name: "Mahmoud Reda", age: 34, city: "Alexandria" }
];

const tableBody = document.getElementById("tableBody");
const searchBox = document.getElementById("search");
const countText = document.getElementById("count");
const sortButtons = document.querySelectorAll("[data-sort]");

const directionText = {
    name: ["A-Z", "Z-A"],
    age: ["low to high", "high to low"]
};

let sortBy = "";
let ascending = true;

function showTable() {
    const word = searchBox.value.trim().toLowerCase();

    const rows = people.filter(person => {
        const text = person.name + " " + person.age + " " + person.city;
        return text.toLowerCase().includes(word);
    });

    if (sortBy) {
        rows.sort((a, b) => {
            const result = sortBy === "age" ? a.age - b.age : a.name.localeCompare(b.name);
            return ascending ? result : -result;
        });
    }

    tableBody.innerHTML = "";

    rows.forEach(person => {
        const tr = document.createElement("tr");
        [person.name, person.age, person.city].forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });

    if (rows.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 3;
        td.textContent = "No matching people found.";
        tr.appendChild(td);
        tableBody.appendChild(tr);
    }

    countText.textContent = "Showing " + rows.length + " of " + people.length + " people";
}

function updateButtons() {
    sortButtons.forEach(button => {
        const key = button.dataset.sort;
        const active = key === sortBy;
        let text = "Sort by " + key;
        if (active) text += " (" + directionText[key][ascending ? 0 : 1] + ")";
        button.textContent = text;
        button.setAttribute("aria-pressed", active);
    });
}

sortButtons.forEach(button => {
    button.addEventListener("click", () => {
        const key = button.dataset.sort;
        ascending = sortBy === key ? !ascending : true;
        sortBy = key;
        updateButtons();
        showTable();
    });
});

searchBox.addEventListener("input", showTable);

showTable();
