"""

    Main Application Module
    ------------------------
    This module serves as the entry point for the Flask application. 
    It imports the `create_app` function from the backend package to 
    initialize the app and run it in debug mode. The app is configured 
    with the necessary settings and routes defined in the application. 
    When executed as the main program, the Flask development server 
    starts, allowing for testing and development of the application.


"""

import sys
import os

# Could not recognize the backend as a module in the import
# Hard code access solution
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend import create_app

app = create_app()

if __name__ =='__main__':
    app.run(debug=True)