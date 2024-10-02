"""

    Configuration Module
    ---------------------
    This module loads environment variables from a .env file 
    and defines a Config class to manage application settings. 
    The Config class contains essential configuration values 
    such as the secret key and MySQL database connection 
    parameters, which are retrieved using the os.getenv() method 
    to ensure sensitive information is kept secure and 
    configurable outside the codebase.

"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    MYSQL_HOST = os.getenv('MYSQL_HOST')
    MYSQL_USER = os.getenv('MYSQL_USER')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
    MYSQL_DB = os.getenv('MYSQL_DB')


