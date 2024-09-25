

-- COLLEGES ---------------------------------------------------------------------------------------------------------------------

-- DELIMITER //
-- CREATE PROCEDURE UpdateCollege(
-- 		IN College_Code_IN VARCHAR(15),
--         IN College_Name_IN VARCHAR(255),
--         IN College_Code_OLD VARCHAR(15))
--         
-- BEGIN
-- 	UPDATE Colleges SET 
-- 		College_Code = College_Code_IN,
-- 		College_Name = College_Name_In
--     WHERE 
-- 		College_Code = College_Code_OLD;
-- END;
-- //

-- DELIMITER ;


-- DELIMITER //
-- CREATE PROCEDURE DeleteCollege(
-- 	IN College_Code_DEL VARCHAR(15))

-- BEGIN
-- 	SET FOREIGN_KEY_CHECKS = 0;
-- 	DELETE FROM Colleges WHERE College_Code = College_Code_DEL;
--     UPDATE Programs SET College_Code = "Not Registered" WHERE College_Code = College_Code_DEL;
--     SET FOREIGN_KEY_CHECKS = 1;
-- END;

-- //
-- DELIMITER ;

-- PROGRAMS ----------------------------------------------------------------------------------------------------------------

-- DELIMITER //
-- CREATE PROCEDURE UpdateProgram(
-- 			IN Program_Code_NEW VARCHAR (15),
--             IN Program_Name_NEW VARCHAR (255),
--             IN College_Code_NEW VARCHAR (15),
--             IN Program_Code_OLD VARCHAR (15))

-- BEGIN 
-- 	UPDATE Programs SET
-- 		Program_Code = Program_Code_NEW,
--         Program_Name = Program_Name_NEW,
--         College_Code = College_Code_NEW
-- 	WHERE
-- 		Program_Code = Program_Code_OLD;
-- END;


-- //
-- DELIMITER ;




-- DELIMITER // 
-- CREATE PROCEDURE DeleteProgram(
-- 		IN Program_Code_DEL VARCHAR (15))
--         
-- BEGIN
-- 	SET FOREIGN_KEY_CHECKS = 0;
-- 	DELETE FROM Programs WHERE Program_Code = Program_Code_DEL;
--     UPDATE Students SET Program_Code = "Not Enrolled" WHERE Program_Code = Program_Code_DEL;
--     SET FOREIGN_KEY_CHECKS = 1;
-- END;


-- //
-- DELIMITER ;



