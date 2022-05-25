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
    console.log("Connected to the database!")
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
        if (answers.main_menu === "View All Departments") {
            db.query('SELECT * FROM departments', function (err, results) {
                if (err) {
                    console.log(err)
                }
                const table = cTable.getTable(results)
                console.log(table)
                mainPrompt()
            })            
        }
        if (answers.main_menu === "View All Roles") {
            db.query('SELECT * FROM roles', function (err, results) {
                if (err) {
                    console.log(err)
                }
                const table = cTable.getTable(results)
                console.log(table)
                mainPrompt()
            })            
        }
        if (answers.main_menu === "View All Employees") {
            db.query('SELECT * FROM employees', function (err, results) {
                if (err) {
                    console.log(err)
                }
                const table = cTable.getTable(results)
                console.log(table)
                mainPrompt()
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