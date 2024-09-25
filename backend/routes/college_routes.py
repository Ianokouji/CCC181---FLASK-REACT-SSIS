import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from flask import Blueprint,jsonify,request

from flask_wtf.csrf import CSRFProtect


from backend.models import College

college_routes = Blueprint('college_routes', __name__)

csrf = CSRFProtect()



@college_routes.route('/list', methods=['GET'])
def getColleges():
    colleges = College.getColleges()
    return jsonify(colleges)


@college_routes.route('/add', methods=['POST'])
def addCollege():
    College_Code = request.json.get("College_Code")
    College_Name = request.json.get("College_Name")
    print(request.headers)

    if not College_Code or not College_Name:
        return(
            jsonify({"message": "Please fill in required fields"}),
            400,
        )

    try: 
        College.addCollege(College_Code,College_Name)
    except Exception as e:
        print(e)
        return jsonify({"message": f"There has been a problem adding college: {str(e)}"}),400
    
    return jsonify({"message": "College Added successfully"}), 201


@college_routes.route('/update/<CollegeCodeUp>',methods=['PATCH'])
def UpdateCollege(CollegeCodeUp):
    CollegeToUpdate = College.getCollege(CollegeCodeUp)
    if not CollegeToUpdate: 
        return jsonify({"message":"College to update does NOT EXIST"}), 404
    
    data = request.json
    College_Code = data.get("College_Code", CollegeToUpdate['College_Code'])
    College_Name = data.get("College_Name", CollegeToUpdate['College_Name'])


    # Log the values for debugging purposes
    print(f"Received College_Code: {College_Code}")
    print(f"Received College_Name: {College_Name}")
    print(f"Received Old College Code: {CollegeCodeUp}")

    try: 
        College.updateCollege(College_Code,College_Name,CollegeCodeUp)
    except Exception as e:
        return jsonify({"message": f"Error in UPDATING College: {str(e)}"}), 400
    
    return jsonify({"message":"College Updated Successfully"}), 200



@college_routes.route('/delete/<CollegeCodeDel>',methods=['DELETE'])
def DeleteCollege(CollegeCodeDel):
    CollegeToDelete = College.getCollege(CollegeCodeDel)

    if not CollegeToDelete:
        return jsonify({"message":"The college to delete does NOT EXIST"}), 404
    
    try:
        College.deleteCollege(CollegeCodeDel)
    except Exception as e:
        return jsonify({"message":f"Error in DELETING College: {str(e)}"}), 400
    
    return jsonify({"message":"College Deleted Successfully"}), 200


@college_routes.route('/search/<Type>/<SearchQuery>',methods=['GET'])
def SearchColleges(Type,SearchQuery):
    if Type == 'Code':
       colleges = College.searchCollegeCode(SearchQuery)
    elif Type == 'Name':
       colleges = College.searchCollegeName(SearchQuery)
    else:
        return jsonify([]),400
    
    return jsonify(colleges), 200
   