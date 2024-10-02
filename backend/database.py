"""
    Database Connection Module
    ---------------------------
    This module provides a function to establish a connection 
    to a MySQL database using the pymysql library. The connection 
    parameters such as host, user, password, and database name 
    are sourced from the Config class, which retrieves them 
    from environment variables. The `db_connection` function 
    creates and returns a MySQL connection object, enabling 
    interactions with the database.
"""

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

import pymysql
from backend.config import Config

def db_connection():
    connection = pymysql.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DB
    )
    return connection