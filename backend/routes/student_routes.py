import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..','..')))

from flask import Blueprint,jsonify,request
from backend.models import Student

student_routes = Blueprint('student_routes',__name__)

@student_routes.route('/list',methods=['GET'])
def getStudents():
    students = Student.getStudents()
    return jsonify(students)


@student_routes.route('/add',methods=['POST'])
def addStudent():
    data = request.json
    Student_Id = data.get('Student_Id')
    FirstName = data.get('FirstName')
    LastName = data.get('LastName')
    Year_Level = data.get('Year_Level')
    Gender = data.get('Gender')
    Program_Code = data.get('Program_Code')

    if not Student_Id or not FirstName or not LastName or not Year_Level or not Gender or not Program_Code:
        return jsonify({"message":"Fields are missing ERROR"}), 400
    
    try:
        Student.addStudent(Student_Id,FirstName,LastName,Year_Level,Gender,Program_Code)
    except Exception as e:
        return jsonify({"message":f"Error in adding Student has occured {str(e)}"}), 400
    
    return jsonify({"message":"Student Added Successfully"}), 201


@student_routes.route('/update/<StudentCodeUp>',methods=['PATCH'])
def updateStudent(StudentCodeUp):
    StudentToUpdate = Student.getStudent(StudentCodeUp)

    if not StudentToUpdate:
        return jsonify({"message":"Student to update does NOT EXIST"}), 404
    
    data = request.json
    Student_Id = data.get("Student_Id",StudentToUpdate['Student_Id'])
    FirstName = data.get("FirstName",StudentToUpdate['FirstName'])
    LastName = data.get("LastName",StudentToUpdate['LastName'])
    Year_Level = data.get("Year_Level",StudentToUpdate['Year_Level'])
    Gender = data.get("Gender",StudentToUpdate['Gender'])
    Program_Code = data.get("Program_Code",StudentToUpdate['Program_Code'])

    try:
        Student.updateStudent(Student_Id,FirstName,LastName,Year_Level,Gender,Program_Code,StudentCodeUp)
    except Exception as e:
        return jsonify({"message":f"Error in UPDATING Student: {str(e)}"}), 400
    
    return jsonify({"message":"Student Updated Successfully"}), 200


@student_routes.route('/delete/<StudentCodeDel>',methods=['DELETE'])
def deleteStudent(StudentCodeDel):
    StudentToDelete = Student.getStudent(StudentCodeDel)

    if not StudentToDelete:
        return jsonify({"message":"Student to delete does NOT EXIST"}), 400
    
    try:
        Student.deleteStudent(StudentCodeDel)
    except Exception as e:
        return jsonify({"message":f"Error in DELETING Student: {str(e)}"}),400
    
    return jsonify({"message":"Student Deleted Successfully"}), 200



@student_routes.route('/search/<Type>/<SearchQuery>',methods=['GET'])
def searchStudent(Type,SearchQuery):
    if Type == 'ID':
        students = Student.searchStudentId(SearchQuery)
    elif Type == 'FIRST':
        students = Student.searchStudentFirstName(SearchQuery)
    elif Type == 'LAST':
        students = Student.searchStudentLastName(SearchQuery)
    else:
        return jsonify([]),400
    
    return jsonify(students),200