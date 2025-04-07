from flask import Flask
from firebase_admin import credentials, initialize_app, firestore
from .config import Config
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, origins=app.config['FRONTEND_URL'])
    
    

    # Firebase setup
    cred = credentials.Certificate(app.config['FIREBASE_KEY_PATH'])
    initialize_app(cred)
    
    # Make Firestore client accessible elsewhere
    app.db = firestore.client()

    # Register routes
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
