"""

    Program Model
    --------------
    This module defines the `Program` class, which serves as a model for handling 
    operations related to academic programs in the system. It includes methods for 
    performing CRUD (Create, Read, Update, Delete) operations on the `Programs` 
    table in the database. The class provides functionality to list all programs, 
    retrieve a specific program by its code, add new programs, update existing program 
    details, delete a program, and search for programs by name or college code. 
    Each method interacts with the database through the established `db_connection` 
    to ensure efficient data management.


"""



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

    


        