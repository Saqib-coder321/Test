const icon = document.querySelector("i");
const form = document.querySelector("form")
const addbtn = document.querySelector(".add");
const list = document.querySelector(".list");
const budget = document.querySelector(".budget")
const li = document.querySelector("li")
const balance = document.querySelector(".balance-val")

let dummyTransactions = [
    { id: 1, text : "Salary", value: 1000},
    { id: 1, text : "Pocket Money", value: 100},
    { id: 2, text : "Flower", value: -50},
];


form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const text = form.querySelector("input[type='text']").value.trim();
    const value = parseFloat(form.querySelector("input[type='number']").value);

    if (text === "" || isNaN(value)) {
        alert("Please enter valid transaction details");
        return;
    }

    const transaction = {
        id: generateID(),
        text,
        value
    };

    Transactions.push(transaction);
    addTransaction(transaction);
    updateValues();

    form.querySelector("input[type='text']").value = "";
    form.querySelector("input[type='number']").value = "";
    
    form.style.zIndex = "-10";
});

icon.addEventListener("click", () => {
    form.style.zIndex = "-10";
});

list.addEventListener("click", (e) => {
    if (e.target.tagName === "H5" && e.target.textContent === "Remove") {
        const li = e.target.closest("li");
        const text = li.querySelector(".title").textContent;
        
        Transactions = Transactions.filter(transaction => transaction.text !== text);
        init();
    }
});

function generateID() {
    return Math.floor(Math.random() * 1000000);
}


document.querySelector("#search").addEventListener("input", () => {
    const filter = document.querySelector("#search").value.toUpperCase();
    const items = list.querySelectorAll("li");

    items.forEach((item) => {
        const text = item.querySelector(".title").textContent.toUpperCase();
        item.style.display = text.includes(filter) ? "" : "none";
    });
});


let Transactions = dummyTransactions;

function addTransaction(transaction) {
    const item = document.createElement("li");
    item.classList.add(transaction.value > 0 ? "plus" : "minus");
    item.innerHTML = `<h4 class="title">${transaction.text}</h4><h4 class="amount">Rs${transaction.value}</h4>
                    <div class="remove"><h5>Remove</h5></div>`;
    list.appendChild(item)
    // console.log(transaction.text)
}

function Search() {
    const input = document.querySelector("#search");
    const filter = input.value.toUpperCase();

    const listli = document.querySelector("#list li");

    listli.forEach((el) => {
        const text = el.h4.textContent.toUpperCase();
        el.style.display = text.includes(filter) ? "" : "none";
    });
};


function updateValues() {
    const amount = Transactions.map(transaction => transaction.value);
    const total = amount.reduce((acc, curr) => acc + curr, 0).toFixed(2);
    const bud = amount.filter(item => item > 0).reduce((acc, curr) => acc + curr, 0).toFixed(2);
    const expense = amount.filter(item => item < 0).reduce((acc, curr) => acc + curr, 0).toFixed(2);
    
    balance.innerHTML = `Balance <span>Rs${total}</span>`;
    document.querySelector('.bud').innerHTML = `Rs${bud}`;
    document.querySelector('.exp').innerHTML = `Rs${expense}`;
}

// init
function init() {
    list.innerHTML = ""
    Transactions.forEach(addTransaction);
    updateValues();
}
init();

addbtn.addEventListener("click", () => {
    if (form.style.zIndex = -10) {
        form.style.zIndex = "10"
    } else {
        console.log("aksdlk")
    }
})
icon.addEventListener("click", () => {
    if (form.style.zIndex = 10) {
        form.style.zIndex = "-10"
    }
})



