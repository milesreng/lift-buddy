from flask import Flask

app = Flask(__name__)

@app.route('/profile')
def my_profile():
  response_body = {
    "name": "Miles"
  }

  return response_body