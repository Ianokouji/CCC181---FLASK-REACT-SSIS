from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world() -> str:
   return "<p>Hello Ian</p>"

@app.route("/<id>")
def hello_id(id) -> str:
   return f"<p>Hello {id}</p>"
