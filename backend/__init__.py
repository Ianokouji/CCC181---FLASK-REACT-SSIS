import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))


from flask import Flask,jsonify
from flask_wtf.csrf import CSRFProtect
from flask_wtf.csrf import generate_csrf

from config import Config

from flask_cors import CORS




from routes import college_routes
from routes import config_routes


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    csrf = CSRFProtect(app)
    CORS(app, resources={r"/api*": {"origins":"http://localhost:5173"}},supports_credentials=True)

    app.register_blueprint(college_routes, url_prefix='/api/colleges')
    app.register_blueprint(config_routes,url_prefix='/api/csrf_token')

    # @app.after_request
    # def after_request(response):
    #     # Add CSRF token to response headers
    #     response.headers['X-CSRFToken'] = generate_csrf()
    #     return response

    return app

# # Database connection establishment
# def db_connection():
#     connection = pymysql.connect(
#         host = Config.MYSQL_HOST,
#         user = Config.MYSQL_USER,
#         password = Config.MYSQL_PASSWORD,
#         database = Config.MYSQL_DB
#     )

#     return connection