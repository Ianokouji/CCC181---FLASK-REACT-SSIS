"""

    Flask Application Setup
    -------------------------
    This module sets up and configures the Flask application, 
    enabling various features such as CSRF protection and CORS, 
    and registering API routes for handling requests.

"""

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from flask import Flask
from flask_wtf.csrf import CSRFProtect
from flask_wtf.csrf import generate_csrf

# Import the Config class for application settings.
from backend.config import Config

# Import CORS for enabling Cross-Origin Resource Sharing.
from flask_cors import CORS



# Import route modules for handling specific API routes.
from backend.routes import college_routes
from backend.routes import program_routes
from backend.routes import config_routes
from backend.routes import student_routes



"""
    Create and configure the Flask application.
    
    Returns:
        Flask app: The configured Flask application instance.
"""
def create_app():
    app = Flask(__name__)                   # Create a new Flask application instance.
    app.config.from_object(Config)          # Load configuration settings from the Config class.

    csrf = CSRFProtect(app)                 # Initialize CSRF protection for the app.

    # Enable CORS for specified origins, allowing cross-origin requests.
    CORS(app, resources={r"/api*": {"origins":"http://localhost:5173"}},supports_credentials=True)

    # Register blueprints for different functionalities with URL prefixes.
    app.register_blueprint(college_routes, url_prefix='/api/colleges')
    app.register_blueprint(program_routes, url_prefix='/api/programs')
    app.register_blueprint(config_routes,url_prefix='/api/csrf_token')
    app.register_blueprint(student_routes,url_prefix='/api/students')

    # Return the configured application instance.
    return app

