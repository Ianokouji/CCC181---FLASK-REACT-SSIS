import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from flask import Flask
from flask_wtf.csrf import CSRFProtect
from flask_wtf.csrf import generate_csrf

from backend.config import Config

from flask_cors import CORS




from backend.routes import college_routes
from backend.routes import program_routes
from backend.routes import config_routes


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    csrf = CSRFProtect(app)
    CORS(app, resources={r"/api*": {"origins":"http://localhost:5173"}},supports_credentials=True)

    app.register_blueprint(college_routes, url_prefix='/api/colleges')
    app.register_blueprint(program_routes, url_prefix='/api/programs')
    app.register_blueprint(config_routes,url_prefix='/api/csrf_token')

    # @app.after_request
    # def after_request(response):
    #     # Add CSRF token to response headers
    #     response.headers['X-CSRFToken'] = generate_csrf()
    #     return response

    return app

