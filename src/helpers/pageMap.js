const users = "USERS";
const expense = "EXPENSE";
const company_expenses = "COMPANY EXPENSES";
const edit = "EDIT";
const trash = "DELETE";
const plus = "PLUS";
const cancel = "CANCEL";
const insert = "INSERT";

const logoMap = new Map();
logoMap.set(users, 'fas fa-users');
logoMap.set(expense, 'fas fa-dollar-sign');
logoMap.set(company_expenses, 'fas fa-building');
logoMap.set(edit, "fas fa-pencil-alt");
logoMap.set(trash, "fas fa-trash");
logoMap.set(plus, "fas fa-plus");
logoMap.set(cancel, "fas fa-ban");
logoMap.set(insert, "fas fa-plus-circle");

const tableHeadMap = new Map();  
tableHeadMap.set(users, ['First Name', 'Last Name', 'Total Expenses']);
tableHeadMap.set(expense, ['Full Name', 'Category', 'Cost', 'Date']);
tableHeadMap.set(company_expenses, ['Category', 'Total Expenses']);

var newUserForm = {
  "id": 0,
  "first name": "",
  "last name": "",
  "expense": {
    "category": "",
    "cost": 0,
    "date": new Date().toLocaleString().split(/\D/).slice(0,3).map(num=>num.padStart(2,"0")).join("-"),
  },
  "budget": 0
}

export {logoMap};
export {tableHeadMap};
export {newUserForm};