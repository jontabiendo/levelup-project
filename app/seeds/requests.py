from app.models import db, Request, environment, SCHEMA
from sqlalchemy.sql import text

def undo_requests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM requests"))
        
    db.session.commit()