
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

