from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    FIREBASE_KEY_PATH = os.getenv("FIREBASE_KEY_PATH")
    FRONTEND_URL = os.getenv("FRONTEND_URL")
