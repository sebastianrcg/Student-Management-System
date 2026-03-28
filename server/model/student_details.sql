CREATE TABLE student_details(
    id serial primary key,
    name varchar(50),
    email varchar(50),
    age int,
    gender varchar(10),
    status boolean default true;
)