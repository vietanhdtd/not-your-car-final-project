from flask import Flask 
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

POSTGRES = {
    'user': "vietanhnguyen",
    'pw': "123",
    'db': "typingtest",
    'host': "localhost",
    'port': "5432",
}

db = SQLAlchemy(app)
migrate = Migrate(app, db)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:%(pw)s@%(host)s:\
%(port)s/%(db)s' % POSTGRES
app.config['SECRET_KEY'] = "very secret"




@app.route('/')
def home():
    return "hello"

if __name__ == '__main__':
    app.run(debug = True)
