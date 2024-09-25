-- DELIMITER //
-- CREATE TRIGGER BeforeUpdateCollege BEFORE UPDATE ON Colleges
-- FOR EACH ROW

-- BEGIN
-- 	SET FOREIGN_KEY_CHECKS = 0;
-- 	UPDATE Programs SET College_Code = NEW.College_Code WHERE College_Code = OLD.College_Code;
--     SET FOREIGN_KEY_CHECKS = 1;
-- END;

-- //
-- DELIMITER ;



-- DELIMITER // 
-- CREATE TRIGGER BeforeUpdateProgram BEFORE UPDATE ON Programs
-- FOR EACH ROW

-- BEGIN
-- 	SET FOREIGN_KEY_CHECKS = 0;
--     UPDATE Students SET Program_Code = NEW.Program_Code WHERE Program_Code = OLD.Program_Code;
--     SET FOREIGN_KEY_CHECKS = 1;
-- END;

-- // 
-- DELIMITER ;