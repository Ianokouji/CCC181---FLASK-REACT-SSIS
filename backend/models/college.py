import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

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


    # @staticmethod
    # def addCollege(College_Code, College_Name):
    #     connection = db_connection()
    #     cursor = connection.cursor()

    #     # Check if the College_Code already exists in the database
    #     cursor.execute("SELECT * FROM colleges WHERE College_Code = %s", (College_Code,))
    #     existing_college = cursor.fetchone()

    #     if existing_college:
    #         print(f"College with code '{College_Code}' already exists.")
    #     else:
    #         sqlQuery = "INSERT INTO colleges (College_Code, College_Name) VALUES (%s, %s)"
    #         values = (College_Code, College_Name)
    #         cursor.execute(sqlQuery, values)
    #         connection.commit()
    #         print(f"College '{College_Code}' - '{College_Name}' added successfully.")

    #     cursor.close()
    #     connection.close()
    # @staticmethod
    # def addCollege(College_Code, College_Name):
    #     print(f"Attempting to add college: {College_Code}")
    #     connection = db_connection()
    #     cursor = connection.cursor()

    #     # Check if the College_Code already exists in the database
    #     cursor.execute("SELECT * FROM colleges WHERE College_Code = %s", (College_Code,))
    #     existing_college = cursor.fetchone()

    #     if existing_college:
    #         print(f"College with code '{College_Code}' already exists.")
    #     else:
    #         sqlQuery = "INSERT INTO colleges (College_Code, College_Name) VALUES (%s, %s)"
    #         values = (College_Code, College_Name)
    #         cursor.execute(sqlQuery, values)
    #         connection.commit()
    #         print(f"College '{College_Code}' - '{College_Name}' added successfully.")

    #     cursor.close()
    #     connection.close()


# College.addCollege("COL", "College of Law")


# College.addCollege("CEBA","College of Business and Accountancy")

