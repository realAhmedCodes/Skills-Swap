 CREATE DATABASE skillswap;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(100),
    password VARCHAR(255) NOT NULL
    skills text[]

);

CREATE TABLE jobs (
    job_id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    no_of_employees VARCHAR(255),
    employeer_name VARCHAR(255) NOT NULL,
    employeer_email VARCHAR(255) NOT NULL,
    company_email VARCHAR(255),
    employeer_Phone_no VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    location VARCHAR(100)NOT NULL,
    description TEXT,
    rate VARCHAR(255) NOT NULL,
    salary VARCHAR(255) NOT NULL,
    job_type VARCHAR(50),
    work_Nature VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deadline DATE,
    
    email VARCHAR(255) REFERENCES users(email),
    web_link VARCHAR(255),
    saved_status Boolean,
    industry VARCHAR(255),
    type VARCHAR(255),
    sub_type(255)
    
);
CREATE TABLE job_application (
    name VARCHAR(255),
    
    email VARCHAR(255) REFERENCES users(email),
    job_id INTEGER REFERENCES jobs(job_id);
     phone_no VARCHAR(255),
    profile_link VARCHAR(255),
    doc BYTEA,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),

);
CREATE TABLE saved_jobs(
     saved_job_id SERIAL PRIMARY KEY,
     email VARCHAR(255) REFERENCES users(email),
     job_id INTEGER REFERENCES jobs(job_id)
created_at TIMESTAMPTZ DEFAULT NOW(),
);

CREATE TABLE applied_jobs(
     applied_job_id SERIAL PRIMARY KEY,
     email VARCHAR(255) REFERENCES users(email),
     job_id INTEGER REFERENCES jobs(job_id)
     created_at TIMESTAMPTZ DEFAULT NOW(),
);


ALTER TABLE job_application
ADD COLUMN title VARCHAR(255) REFERENCES jobs(title);


ALTER TABLE jobs
ADD saved_status Boolean;

ALTER TABLE users
DROP COLUMN skills ;

ALTER TABLE jobs
ADD COLUMN sub_type VARCHAR(255);
-- Add a new column with default value
ALTER TABLE users
ADD COLUMN Country VARCHAR(255) ;


UPDATE users
SET role = 'user'
WHERE role IS "";

show data_directory
show all;


ALTER TABLE users
ALTER COLUMN role SET NOT NULL;

SELECT      *
FROM        jobs
WHERE       (title ILIKE '%title%') and  (location ILIKE '%location%') 
            OR (title ILIKE '%title%')
            OR (location ILIKE '%location%');

"SELECT j.* FROM saved_jobs sj JOIN jobs j ON sj.job_id = j.job_id WHERE sj.email = $1",
-- Insert some sample data into the jobs table
INSERT INTO jobs (title, company, location, description, salary, job_type, user_id)
VALUES
    ('Web Developer', 'ABC Inc.', 'New York', 'Front-end and back-end development', 75000.00, 'Full-Time', 1),
    ('Graphic Designer', 'Design Co.', 'Los Angeles', 'Creating stunning visual designs', 60000.50, 'Full-Time', 2);
    ('Software Engineer', 'Tech Solutions', 'San Francisco', 'Backend software development', 85000.25, 'Full-Time', 1),
    ('Marketing Manager', 'Marketing Agency', 'Chicago', 'Strategic marketing planning', 70000.75, 'Full-Time', 3);



-- Insert some sample data into the users table
INSERT INTO users (username, email, password)
VALUES
    ('john_doe', 'john.doe@example.com', 'hashed_password_1'),
    ('jane_smith', 'jane.smith@example.com', 'hashed_password_2'),
    ('user3', 'user3@example.com', 'hashed_password_3');

{
    "title": "Software Engineer",
    "company": "Tech Solutions",
    "location": "New York",
    "description": "Backend software development",
    "salary": 95000.00,
    "job_type": "Full-Time",
    "user_id": 1
}
ALTER TABLE JOBS
DROP CONSTRAINT IF EXISTS jobs_user_id_fkey
ALTER COLUMN user_id DROP NOT NULL




UPDATE users
SET location = 'Canberra'
WHERE user_id = 1;

UPDATE users
SET location = 'Islamabad'
WHERE user_id = 2;

UPDATE users
SET location = 'Riyadh'
WHERE user_id = 3;

UPDATE users
SET location = "Tokyo"
WHERE user_id = 4;




UPDATE users
SET Country = 'Australia'
WHERE user_id = 1;

UPDATE users
SET Country = 'Pakistan'
WHERE user_id = 2;

UPDATE users
SET Country = 'Saudi Arabia'
WHERE user_id = 3;

UPDATE users
SET location = 'Japan'
WHERE user_id = 4;