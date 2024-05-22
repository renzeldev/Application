from os import getenv
from flask import Flask
from flask_restful import Api
from .database.db import init_db
from .resources.routes import init_routes
def create_app(*args, **kwargs):
    """
    Factory for creating a the server as a Flask object
    """
    app = Flask(__name__)
    api = Api(app)

    app.config['MONGODB_SETTINGS'] = {
        'host': 'mongodb://' + getenv('DATABASE', 'localhost') + '/capability_marketplace'
    }

    app.config['ENV'] = 'production' if getenv('FLASK_ENV', 'dev')=='prod' else 'development'

    init_db(app)
    init_routes(api)

    return app
