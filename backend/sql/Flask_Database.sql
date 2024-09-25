-- CREATE SCHEMA IF NOT EXISTS `flask_ssis`;


--  CREATE TABLE IF NOT EXISTS Colleges(
-- 	College_Code VARCHAR(15),
--     College_Name VARCHAR(255),
--     PRIMARY KEY (College_Code),
--      CONSTRAINT Unique_College_Code UNIQUE (College_Code),
--     CONSTRAINT Unique_College_Name UNIQUE (College_Name)
--  )

-- INSERT INTO colleges(College_Code,College_Name) VALUES ("CCS","College of Computer Studies")


-- CREATE TABLE IF NOT EXISTS Programs(
-- 	Program_Code VARCHAR(15),
--     Program_Name VARCHAR(255),
--     College_Code VARCHAR(15),
--     PRIMARY KEY (Program_Code),
--     CONSTRAINT Unique_Program_Code UNIQUE (Program_Code),
--     CONSTRAINT unique_Program_Name UNIQUE (Program_Name),
--     FOREIGN KEY (College_Code) REFERENCES Colleges(College_Code)
-- )

-- CREATE TABLE IF NOT EXISTS Students(
-- 	Student_Id VARCHAR(9),
--     FirstName VARCHAR(100),
--     LastName VARCHAR(100),
--     Year_Level VARCHAR(50),
--     Gender VARCHAR(50),
--     Program_Code VARCHAR(15),
--     CONSTRAINT Unique_Student_Id UNIQUE (Student_Id),
--     FOREIGN KEY (Program_Code) REFERENCES Programs (Program_Code),
--     PRIMARY KEY (Student_Id)
-- )




-- INSERT INTO Students (Student_Id,LastName,FirstName,Year_level,Gender,Program_Code) VALUES ("2022-1729","Paulmino","Ian Gabriel","3rd Year","Male","BSCE")
-- INSERT INTO Programs (Program_Code,Program_Name,College_Code) VALUES ("BSCS","Bachelor of Science in Computer Science","CCS")
-- INSERT INTO Programs (Program_Code,Program_Name,College_Code) VALUES ("BSCA","Bachelor of Science in Computer Applications","CCS")
-- INSERT INTO Colleges (College_Code,College_Name) VALUES ("CCS","College of Computer Studies")
-- DELETE FROM Programs WHERE Program_Code = "BSCS" 


-- SELECT * FROM Programs
-- SELECT * FROM colleges
-- SELECT * FROM Students


-- CALL UpdateProgram("BSN","Bachelor of Science in Nursing","CHS","BSECE")

-- CALL DeleteProgram("BSN")
-- CALL DeleteCollege("COE")
-- CALL UpdateCollege("COP","College of Paulmino Ian","COP")





