document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.getElementById('expense');
    const expensesList = document.getElementById('expenses-list');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function renderExpenses() {
        expensesList.innerHTML = '';
        expenses.forEach(function (expense, index) {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense');
            expenseItem.innerHTML = `
                <div class="inner-element1"><strong>${expense.name}</strong>  Rs. ${expense.amount}</div>
                <div class="inner-element2"><div class="custom"><i class="fa-solid fa-pen" onclick="editExpense(${index})"></i>
                <i class="fa-solid fa-trash" onclick="deleteExpense(${index})"></i></div></div>
            `;
            expensesList.appendChild(expenseItem);
        });
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    renderExpenses();

    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const expenseName = document.getElementById('name').value;
        const expenseAmount = document.getElementById('value').value;
        if (expenseName && expenseAmount) {
            const expense = {
                name: expenseName,
                amount: parseFloat(expenseAmount)
            };
            expenses.push(expense);
            renderExpenses();
            expenseForm.reset();
        } else {
            alert('Please fill out all fields');
        }
    });

    window.editExpense = function (index) {
        const newName = prompt('Enter new name:');
        const newAmount = parseFloat(prompt('Enter new amount:'));
        if (newName !== null && !isNaN(newAmount)) {
            expenses[index].name = newName;
            expenses[index].amount = newAmount;
            renderExpenses();
        }
    };

    window.deleteExpense = function (index) {
        const confirmDelete = confirm('Are you sure you want to delete this expense?');
        if (confirmDelete) {
            expenses.splice(index, 1);
            renderExpenses();
        }
    };
});