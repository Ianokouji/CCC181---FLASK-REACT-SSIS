import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from backend.database import db_connection
import pymysql.cursors


class Program:
    @staticmethod
    def getPrograms():
        connection = db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM Programs")
        programs = cursor.fetchall()
        cursor.close()
        connection.close()
        return programs
    
    @staticmethod
    def getProgram(Program_Code):
        connection = db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        sqlQuery = "SELECT * FROM Programs WHERE Program_Code = %s"
        sqlValues = (Program_Code,)
        cursor.execute(sqlQuery,sqlValues)
        program_code = cursor.fetchone()
        cursor.close()
        connection.close()
        return program_code
    
    @staticmethod
    def addProgram(Program_Code,Program_Name,College_Code):
        connection = db_connection()
        cursor = connection.cursor()
        sqlQuery = "INSERT INTO Programs (Program_Code,Program_Name,College_Code) VALUES (%s,%s,%s)"
        sqlValues = (Program_Code,Program_Name,College_Code)
        cursor.execute(sqlQuery,sqlValues)
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def updateProgram(Program_Code,Program_Name,College_Code,Program_Code_OLD):
        connection = db_connection()
        cursor = connection.cursor()
        sqlQuery = "CALL UpdateProgram(%s,%s,%s,%s)"
        sqlValues = (Program_Code,Program_Name,College_Code,Program_Code_OLD)
        cursor.execute(sqlQuery,sqlValues)
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def deleteProgram(Program_Code_Del):
        connection = db_connection()
        cursor = connection.cursor()
        sqlQuery = "CALL DeleteProgram(%s)"
        sqlValues = (Program_Code_Del,)
        cursor.execute(sqlQuery,sqlValues)
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def searchProgramName(Program_Name):
        connection = db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        sqlQuery = "SELECT * FROM Programs WHERE Program_Name LIKE %s"
        sqlValues = (f"%{Program_Name}%",)
        cursor.execute(sqlQuery,sqlValues)
        programs = cursor.fetchall()
        cursor.close()
        connection.close()
        return programs
    

    @staticmethod
    def searchProgramCode(Program_Code):
        connection = db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        sqlQuery = "SELECT * FROM Programs WHERE Program_Code LIKE %s"
        sqlValues = (f"%{Program_Code}%",)
        cursor.execute(sqlQuery,sqlValues)
        programs = cursor.fetchall()
        cursor.close()
        connection.close()
        return programs
    
    @staticmethod
    def searchCollegeCode(College_Code):
        connection = db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        sqlQuery = "SELECT * FROM Programs WHERE College_Code LIKE %s"
        sqlValues = (f"%{College_Code}%",)
        cursor.execute(sqlQuery,sqlValues)
        programs = cursor.fetchall()
        cursor.close()
        connection.close()
        return programs

    


        