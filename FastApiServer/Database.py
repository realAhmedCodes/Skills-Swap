from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


DB_URL = 'postgresql://postgres:apple@localhost/fasttry1'

engine= create_engine(DB_URL)

SessionLocal= sessionmaker(bind=engine)

Base= declarative_base()