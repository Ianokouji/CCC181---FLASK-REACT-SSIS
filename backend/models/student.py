"""


    Student Model
    --------------
    This module defines the `Student` class, which serves as a model for managing 
    student data in the system. It includes methods for performing CRUD (Create, 
    Read, Update, Delete) operations on the `Students` table in the database. 
    The class provides functionality to list all students, retrieve a specific 
    student by their ID, add new students, update existing student details, 
    delete a student, and search for students by their ID, first name, or last 
    name. Each method interacts with the database through the established 
    `db_connection` to ensure efficient data management and retrieval.


"""



import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from backend.database import db_connection
import pymysql.cursors



class Student:
    
    @staticmethod
    def getStudents():
        connection = db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM Students")
        students = cursor.fetchall()
        cursor.close()
        connection.close()
        return students
    
    @staticmethod
    def getStudent(Student_Id):
        connection = db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        sqlQuery = "SELECT * FROM Students WHERE Student_Id = %s"
        sqlValues = (Student_Id,)
        cursor.execute(sqlQuery,sqlValues)
        student_id = cursor.fetchone()
        cursor.close()
        connection.close()
        return student_id
    
    @staticmethod
    def addStudent(Student_Id,FirstName,LastName,Year_Level,Gender,Program_Code):
        connection = db_connection()
        cursor = connection.cursor()
        sqlQuery = "INSERT INTO Students (Student_Id,FirstName,LastName,Year_Level,Gender,Program_Code) VALUES (%s,%s,%s,%s,%s,%s)"
        sqlValues = (Student_Id,FirstName,LastName,Year_Level,Gender,Program_Code)
        cursor.execute(sqlQuery,sqlValues)
        connection.commit()
        cursor.close()
        connection.close()


    @staticmethod
    def updateStudent(Student_Id,FirstName,LastName,Year_Level,Gender,Program_Code,Student_Id_OLD):
        connection = db_connection()
        cursor = connection.cursor()
        sqlQuery = "UPDATE Students SET Student_Id = %s, FirstName = %s, LastName = %s, Year_Level = %s, Gender = %s, Program_Code = %s WHERE Student_Id = %s"
        sqlValues = (Student_Id,FirstName,LastName,Year_Level,Gender,Program_Code,Student_Id_OLD)
        cursor.execute(sqlQuery,sqlValues)
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def deleteStudent(Student_Id):
        connection = db_connection()
        cursor = connection.cursor()
        sqlQuery = "DELETE FROM Students WHERE Student_Id = %s"
        sqlValues = (Student_Id,)
        cursor.execute(sqlQuery,sqlValues)
        connection.commit()
        cursor.close()
        connection.close()

    @staticmethod
    def searchStudentId(Student_Id):
        connection = db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        sqlQuery = "SELECT * FROM Students WHERE Student_Id LIKE %s"
        sqlValues = (f"%{Student_Id}%")
        cursor.execute(sqlQuery,sqlValues)
        students = cursor.fetchall()
        cursor.close()
        connection.close()
        return students
    
    @staticmethod
    def searchStudentFirstName(FirstName):
        connection = db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        sqlQuery = "SELECT * FROM Students WHERE FirstName LIKE %s"
        sqlValues = (f"%{FirstName}%")
        cursor.execute(sqlQuery,sqlValues)
        students = cursor.fetchall()
        cursor.close()
        connection.close()
        return students
    
    @staticmethod
    def searchStudentLastName(LastName):
        connection = db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        sqlQuery = "SELECT * FROM Students WHERE LastName LIKE %s"
        sqlValues = (f"%{LastName}%")
        cursor.execute(sqlQuery,sqlValues)
        students = cursor.fetchall()
        cursor.close()
        connection.close()
        return students

    
        