// import
const inquirer = require('inquirer')
const cTable = require('console.table')
const mysql = require('mysql2')

// connect to employee_db
const db = mysql.createConnection(
    {
        host: 'localhost',
        // mysql username
        user: 'root',
        // mysql password
        password: 'root', 
        database: 'employees_db'
    }
)

db.connect(function(err) {
    if (err) throw err
})

// // define prompts
function mainPrompt() {
    const main_prompt = [
        {
            type: "list",
            name: "main_menu",
            message: "What would you like to do?",
            choices: ["View All Departments", 
                    "View All Roles",  
                    "View All Employees", 
                    "Add A Department", 
                    "Add A Role", 
                    "Add An Employee", 
                    "Update An Employee Role"]
        }]
    return inquirer.prompt(main_prompt).then((answers) => {
        // View All Departments
        if (answers.main_menu === "View All Departments") {
            db.query('SELECT departments.id AS department_id, departments.name AS department_name FROM departments', function (err, results) {
                if (err) {
                    console.log(err)
                }
                const table = cTable.getTable(results)
                console.log(table)
                mainPrompt()
            })            
        }
        // View All Roles
        if (answers.main_menu === "View All Roles") {
            db.query('SELECT roles.title AS job_title, roles.id AS role_id, departments.name AS department, roles.salary as role_salary FROM roles JOIN departments ON roles.department_id = departments.id', function (err, results) {
                if (err) {
                    console.log(err)
                }
                const table = cTable.getTable(results)
                console.log(table)
                mainPrompt()
            })            
        }
        // View All Employees
        // NEEDS employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        // JOIN tables
        if (answers.main_menu === "View All Employees") {
            db.query('SELECT * FROM employees ', function (err, results) {
                if (err) {
                    console.log(err)
                }
                const table = cTable.getTable(results)
                console.log(table)
                mainPrompt()
            })            
        }
        // Add A Department
        if (answers.main_menu === "Add A Department") {
            const dept_prompt = [
                {
                    name: 'dept_name',
                    type: 'input',
                    message: "What is the Department's name?"
                }
            ]
            // Prompt department related questions & prints departments
            inquirer.prompt(dept_prompt)
            .then((answers) => {
                var sql = ('INSERT INTO departments (name) VALUES ("' + answers.dept_name + '")')
                db.query(sql, function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                })
                db.query('SELECT * FROM departments', function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                    const table = cTable.getTable(results)
                    console.log(table)
                    mainPrompt()
                })            
                    
            })
        }
        // Add A Role
        if (answers.main_menu === "Add A Role") {
            var dept_choices = []
            db.query('SELECT * FROM departments', function (err, results) {
                if (err) {
                    console.log(err)
                    }
                for (let i = 0; i < results.length; i++) {
                    dept_choices.push(results[i].name)
                }
            })
            
            const role_prompt = [
                {
                    name: 'role_name',
                    type: 'input',
                    message: "What is the Role's name?"
                },
                {
                    name: 'role_salary',
                    type: 'input',
                    message: "What is the Role's salary?"
                },
                {
                    name: 'role_dept',
                    type: 'list',
                    message: "What is the Role's associated Department?",
                    choices: dept_choices
                }
            ]
            // Prompt role related questions & prints roles
            inquirer.prompt(role_prompt)
            .then((answers) => {
                let index = dept_choices.indexOf(answers.role_dept)+1
                var sql = ('INSERT INTO roles (title, salary, department_id) VALUES ("' + answers.role_name + '", ' + answers.role_salary + ', ' + index + ')')
                db.query(sql, function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                })
                // Prints all roles and returns to main menu
                db.query('SELECT * FROM roles', function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                    const table = cTable.getTable(results)
                    console.log(table)
                    mainPrompt()
                })            
                    
            })
        }
        // Add an Employee
        if (answers.main_menu === "Add An Employee") {
            var role_choices = []
            var mgr_choices = []
            db.query('SELECT * FROM roles', function (err, results) {
                if (err) {
                    console.log(err)
                    }
                for (let i = 0; i < results.length; i++) {
                    role_choices.push(results[i].title)
                }
            })
            db.query('SELECT * FROM employees', function (err, results) {
                if (err) {
                    console.log(err)
                    }
                for (let i = 0; i < results.length; i++) {
                    let mgr_first = results[i].first_name
                    let mgr_last = results[i].last_name
                    mgr_choices.push((mgr_first + ' ' + mgr_last))
                }
            })
            
            const employee_prompt = [
                {
                    name: 'first_name',
                    type: 'input',
                    message: "What is the Employee's first name?"
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: "What is the Employees's last name?"
                },
                {
                    name: 'employee_role',
                    type: 'list',
                    message: "What is the Employees's role?",
                    choices: role_choices
                },
                {
                    name: 'employee_mgr',
                    type: 'list',
                    message: "Who is the Employee's manager?",
                    choices: mgr_choices
                },
            ]
            // Prompt employee related questions & prints employees
            inquirer.prompt(employee_prompt)
            .then((answers) => {
                let role_answser = role_choices.indexOf(answers.employee_role)+1
                let manager_id = mgr_choices.indexOf(answers.employee_mgr)+1
                var sql = ('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("' + answers.first_name + '", "' + answers.last_name + '", ' + role_answser + ', ' + manager_id +')')
                db.query(sql, function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                })
                // Prints all roles and returns to main menu
                db.query('SELECT * FROM employees', function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                    const table = cTable.getTable(results)
                    console.log(table)
                    mainPrompt()
                })            
                    
            })
        }
        // Update an Employee Role
        if (answers.main_menu === "Update An Employee Role") {
            var employee_choices = []
            var employee_role_choices = []
            db.query('SELECT * FROM employees', function (err, results) {
                if (err) {
                    console.log(err)
                    }
                for (let i = 0; i < results.length; i++) {
                    let employee_first = results[i].first_name
                    let employee_last = results[i].last_name
                    employee_choices.push((employee_first + ' ' + employee_last))
                }
                console.log(employee_choices)
            })
            console.log(employee_choices)
            db.query('SELECT * FROM roles', function (err, results) {
                if (err) {
                    console.log(err)
                    }
                for (let i = 0; i < results.length; i++) {
                    employee_role_choices.push(results[i].title)
                }
            })        
            
            const employee_role_prompt = [
                {
                    name: 'employee_name',
                    type: 'list',
                    message: "Select the Employee to update.",
                    choices: employee_choices
                },
                {
                    name: 'employee_role',
                    type: 'list',
                    message: "What is the Employees's new role?",
                    choices: employee_role_choices
                }
            ]
            // Prompt employee related questions & prints employees
            inquirer.prompt(employee_role_prompt)
            .then((answers) => {
                let employees_answer = employee_choices.indexOf(answers.employee_name)+1
                let employee_role_answser = employee_role_choices.indexOf(answers.employee_role)+1
                var sql = ('UPDATE employees SET role_id = ' + employee_role_answser + ' WHERE id = ' + employees_answer)
                db.query(sql, function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                })
                // Prints all employees and returns to main menu
                db.query('SELECT * FROM employees', function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                    const table = cTable.getTable(results)
                    console.log(table)
                    mainPrompt()
                })            
                    
            })
        }    
    })
}



// executes displays or prompts based on selection
// inquirer
// .prompt(main_prompt)
// .then((answers) => {
//     if (answers.main_menu === "View All Departments") {
//         const tbl_department = db.query('SELECT * FROM department', function (err, results) {
//             if (err) {
//                 console.log(err)
//             }
//             return results
//         })
        
//         const table = cTable.getTable(tbl_department)
//         console.log(table)
//     }
// })

// run main prompt
function main() {
    return mainPrompt()
}

// run program
main()