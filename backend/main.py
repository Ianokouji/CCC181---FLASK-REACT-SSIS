import sys
import os

# Could not recognize the backend as a module in the import
# Hard code access solution
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend import create_app

app = create_app()

if __name__ =='__main__':
    app.run(debug=True)