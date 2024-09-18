from flask import Blueprint,jsonify
from flask_wtf.csrf import generate_csrf

config_routes = Blueprint('config_routes',__name__)

@config_routes.route('/',methods=['GET'])
def csrf_token():
    token = generate_csrf()
    return jsonify({'csrf_token':token})