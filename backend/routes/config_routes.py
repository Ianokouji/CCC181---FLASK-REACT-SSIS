"""
    Config Routes
    ------------- 
    This module defines the routes for configuration-related operations in the system. 
    It includes functionality for generating CSRF (Cross-Site Request Forgery) tokens 
    to enhance security for web forms and requests. 
    The routes ensure that the generated token can be accessed in a JSON format for client-side use.
"""




from flask import Blueprint,jsonify
from flask_wtf.csrf import generate_csrf

config_routes = Blueprint('config_routes',__name__)

@config_routes.route('/',methods=['GET'])
def csrf_token():
    token = generate_csrf()
    return jsonify({'csrf_token':token})