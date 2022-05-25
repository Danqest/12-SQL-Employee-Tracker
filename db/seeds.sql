INSERT INTO department (id, name)
VALUES  (00, "C-Suite"),
        (01, "Portfolio Management"),
        (02, "Credit Research");

INSERT INTO role (id, title, salary, department_id)
VALUES  (000, "Chief Executive Officer", 2200000, 00),
        (001, "Chief Financial Officer", 1750000, 00), 
        (002, "Chief Compliance Officer", 1500000, 00),
        (003, "Senior Vice President", 250000, 01),
        (004, "Vice President", 150000, 01), 
        (005, "Credit Manager", 120000, 02),
        (006, "Senior Credit Analyst", 85000, 02),
        (007, "Credit Analyst", 70000, 02),
        (008, "Junior Credit Analyst", 50000, 02),
        (009, "Credit Intern", 25000, 02);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (000, "Patrick", "Bateman", 000, 000),
        (001, "Jordon", "Belfort", 001, 000), 
        (002, "Paul", "Allen", 002, 000),
        (003, "Robert", "Downey, Jr.", 003, 001),
        (004, "Joseph", "Bergstein", 004, 001), 
        (005, "Alex", "Monte-Carlo", 005, 001),
        (006, "Robert", "Scholes", 006, 005),
        (007, "Werner", "Von Braun", 007, 005),
        (008, "David", "Schrodinger", 008, 005),
        (009, "Guy", "Morales", 009, 005);