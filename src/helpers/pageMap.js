const users = "USERS";
const expense = "EXPENSE";
const company_expenses = "COMPANY EXPENSES";
const edit = "EDIT";
const trash = "DELETE";

const logoMap = new Map();
logoMap.set(users, 'fas fa-users');
logoMap.set(expense, 'fas fa-dollar-sign');
logoMap.set(company_expenses, 'fas fa-building');
logoMap.set(edit, "fas fa-pencil-alt");
logoMap.set(trash, "fas fa-trash");

const tableHeadMap = new Map();  
tableHeadMap.set(users, ['First Name', 'Last Name', 'Total Expenses']);
tableHeadMap.set(expense, ['Full Name', 'Category', 'Cost', 'Date']);
tableHeadMap.set(company_expenses, ['Category', 'Total Expenses']);

export {logoMap};
export {tableHeadMap};