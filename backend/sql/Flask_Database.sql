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


-- INSERT INTO Programs (Program_Code,Program_Name,College_Code) VALUES ("BSCA","Bachelor of Science in Computer Applications","CCS")

-- SELECT * FROM Programs
-- SELECT * FROM colleges

-- CALL DeleteCollege("CCSMA")
-- CALL UpdateCollege("COP","College of Paulmino Ian","COP")




