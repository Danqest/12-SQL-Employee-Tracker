INSERT INTO departments (id, name)
VALUES  (1, "C-Suite"),
        (2, "Portfolio Management"),
        (3, "Credit Research");

INSERT INTO roles (id, title, salary, department_id)
VALUES  (1, "Chief Executive Officer", 2200000, 1),
        (2, "Chief Financial Officer", 1750000, 1), 
        (3, "Chief Compliance Officer", 1500000, 1),
        (4, "Senior Vice President", 250000, 2),
        (5, "Vice President", 150000, 2), 
        (6, "Credit Manager", 120000, 3),
        (7, "Senior Credit Analyst", 85000, 3),
        (8, "Credit Analyst", 70000, 3),
        (9, "Junior Credit Analyst", 50000, 3),
        (10, "Credit Intern", 25000, 3);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Patrick", "Bateman", 1, 1),
        (2, "Jordon", "Belfort", 2, 1), 
        (3, "Paul", "Allen", 3, 1),
        (4, "Robert", "Downey, Jr.", 4, 2),
        (5, "Joseph", "Bergstein", 5, 2), 
        (6, "Alex", "Monte-Carlo", 6, 2),
        (7, "Robert", "Scholes", 7, 6),
        (8, "Werner", "Von Braun", 8, 6),
        (9, "David", "Schrodinger", 9, 6),
        (10, "Guy", "Morales", 10, 6);