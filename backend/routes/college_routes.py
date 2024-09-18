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
        return jsonify({"message": f"There has been a problem adding college: {str(e)}"}),400
    
    return jsonify({"message": "College Added successfully"}), 201


