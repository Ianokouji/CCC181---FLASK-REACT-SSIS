"""

    College Model
    -------------
    This module defines the `College` class, which serves as a model for handling 
    operations related to colleges in the system. It includes methods for performing 
    CRUD (Create, Read, Update, Delete) operations on the `colleges` table in the 
    database. The class provides functionality to list all colleges, add a new college, 
    update existing college details, delete a college, and search for colleges by name 
    or code. Each method interacts with the database through the established 
    `db_connection` to ensure efficient data management.


"""


import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from backend.database import db_connection
import pymysql.cursors

class College:
    @staticmethod
    def getColleges():
        connection = db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM colleges")
        colleges = cursor.fetchall()
        cursor.close()
        connection.close()
        return colleges
    
    @staticmethod
    def addCollege(College_Code,College_Name):
        connection = db_connection()
        cursor = connection.cursor()
        sqlQuery = "INSERT INTO COLLEGES (College_Code,College_Name) VALUES (%s,%s)"
        values = (College_Code,College_Name)
        cursor.execute(sqlQuery,values)
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def getCollege(College_Code):
        connection = db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        sqlQuery = "SELECT * FROM Colleges WHERE College_Code = %s"
        sqlValues = (College_Code,)
        cursor.execute(sqlQuery,sqlValues)
        college_code = cursor.fetchone()
        cursor.close()
        connection.close()
        return college_code
    
    @staticmethod
    def updateCollege(College_Code_New,College_Name_New,College_Code_Old):
        connection = db_connection()
        cursor = connection.cursor()
        sqlQuery = "CALL UpdateCollege(%s,%s,%s)"
        sqlValues = (College_Code_New,College_Name_New,College_Code_Old)
        cursor.execute(sqlQuery,sqlValues)
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def deleteCollege(College_Code_Del):
        connection = db_connection()
        cursor = connection.cursor()
        sqlQuery = "CALL DeleteCollege(%s)"
        sqlValues = (College_Code_Del,)
        cursor.execute(sqlQuery,sqlValues)
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def searchCollegeName(College_Name):
        connection = db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        sqlQuery = "SELECT * FROM Colleges WHERE College_Name LIKE %s"
        sqlValues = (f"%{College_Name}%",)
        cursor.execute(sqlQuery,sqlValues)
        colleges = cursor.fetchall()
        cursor.close()
        connection.close()
        return colleges
    
    @staticmethod
    def searchCollegeCode(College_Code):
        connection = db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        sqlQuery = "SELECT * FROM Colleges WHERE College_Code LIKE %s"
        sqlValues = (f"%{College_Code}%",)
        cursor.execute(sqlQuery,sqlValues)
        colleges = cursor.fetchall()
        cursor.close()
        connection.close()
        return colleges






