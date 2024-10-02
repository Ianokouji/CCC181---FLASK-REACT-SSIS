"""
    College Routes
    --------------

    This module defines the routes for managing college data in a Flask application. 
    The routes allow performing CRUD (Create, Read, Update, Delete) operations on 
    the College model, as well as searching for colleges by code or name. 

    It uses MySQL as the database, with pymysql for error handling. 
    Each route corresponds to an HTTP method, handling operations such as listing all colleges, 
    adding a new college, updating college details, deleting a college, and searching by college code or name.
"""


import sys
import os
# Add the parent directory to the Python path to import backend models
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from flask import Blueprint,jsonify,request
from backend.models import College
from pymysql.err import IntegrityError

# Define the Blueprint for college routes
college_routes = Blueprint('college_routes', __name__)




"""
    GET /list: Fetches a list of all colleges.
    
    Returns:
        - A JSON response containing the list of all colleges.
"""
@college_routes.route('/list', methods=['GET'])
def getColleges():
    colleges = College.getColleges()
    return jsonify(colleges)




"""
    POST /add: Adds a new college.
    
    Request body should contain:
        - College_Code: Code of the college (required).
        - College_Name: Name of the college (required).
    
    If College_Code or College_Name is missing, a 400 error is returned.
    If a duplicate college code is encountered, a 409 error is returned.
    
    Returns:
        - A JSON response indicating success or error.
"""
@college_routes.route('/add', methods=['POST'])
def addCollege():
    College_Code = request.json.get("College_Code")
    College_Name = request.json.get("College_Name")

    if not College_Code or not College_Name:
        return(
            jsonify({"message": "Please fill in required fields"}),
            400,
        )

    capitalized_College_Code = College_Code.upper()
    try: 
        College.addCollege(capitalized_College_Code,College_Name)
    except IntegrityError as e:
        if e.args[0] == 1062:
            return jsonify({"message":f"Error! Duplicate entry found in the fields for College Code: {College_Code}"}),409
        else:
            return jsonify({"message":f"Error: Database error: {str(e)}"}),400
    except Exception as e:
        print(e)
        return jsonify({"message": f"There has been a problem adding college: {str(e)}"}),400
    
    return jsonify({"message": f"College with code {College_Code} Added successfully"}), 201






"""
    PATCH /update/<CollegeCodeUp>: Updates the details of an existing college.
    
    URL Parameter:
        - CollegeCodeUp: The college code of the college to update.
    
    Request body can optionally contain:
        - College_Code: New code for the college (optional).
        - College_Name: New name for the college (optional).
    
    If the college does not exist, a 404 error is returned.
    If a duplicate college code is encountered, a 409 error is returned.
    
    Returns:
        - A JSON response indicating success or error.
"""
@college_routes.route('/update/<CollegeCodeUp>',methods=['PATCH'])
def UpdateCollege(CollegeCodeUp):
    CollegeToUpdate = College.getCollege(CollegeCodeUp)
    if not CollegeToUpdate: 
        return jsonify({"message":"College to update does NOT EXIST"}), 404
    
    data = request.json
    College_Code = data.get("College_Code", CollegeToUpdate['College_Code'])
    College_Name = data.get("College_Name", CollegeToUpdate['College_Name'])

    capitalized_College_Code = College_Code.upper()
    try: 
        College.updateCollege(capitalized_College_Code,College_Name,CollegeCodeUp)
    except IntegrityError as e:
        if e.args[0] == 1062:
            return jsonify({"message":f"Duplicate entry found in the fields for College Code: {College_Code}"}),409
        else:
            return jsonify({"message":f"Error! Database error: {str(e)}"}),400
    except Exception as e:
        return jsonify({"message": f"Error in UPDATING College: {str(e)}"}), 400
    
    return jsonify({"message":"College Updated Successfully"}), 200






"""
    DELETE /delete/<CollegeCodeDel>: Deletes a college.
    
    URL Parameter:
        - CollegeCodeDel: The college code of the college to delete.
    
    If the college does not exist, a 404 error is returned.
    
    Returns:
        - A JSON response indicating success or error.
"""
@college_routes.route('/delete/<CollegeCodeDel>',methods=['DELETE'])
def DeleteCollege(CollegeCodeDel):
    CollegeToDelete = College.getCollege(CollegeCodeDel)

    if not CollegeToDelete:
        return jsonify({"message":"The college to delete does NOT EXIST"}), 404
    
    try:
        College.deleteCollege(CollegeCodeDel)
    except Exception as e:
        return jsonify({"message":f"Error in DELETING College: {str(e)}"}), 400
    
    return jsonify({"message":f"College with Code: {CollegeCodeDel} Deleted Successfully"}), 200





"""
    GET /search/<Type>/<SearchQuery>: Searches for colleges by either code or name.
    
    URL Parameters:
        - Type: Search type (either 'Code' for searching by college code or 'Name' for searching by college name).
        - SearchQuery: The search string used to find matching colleges.
    
    Returns:
        - A JSON response with the list of matching colleges or a 400 error if the search type is invalid.
"""
@college_routes.route('/search/<Type>/<SearchQuery>',methods=['GET'])
def SearchColleges(Type,SearchQuery):
    if Type == 'Code':
       colleges = College.searchCollegeCode(SearchQuery)
    elif Type == 'Name':
       colleges = College.searchCollegeName(SearchQuery)
    else:
        return jsonify([]),400
    
    return jsonify(colleges), 200
   