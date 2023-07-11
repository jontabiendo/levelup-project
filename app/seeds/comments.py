from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comment_1 = Comment(
        description = "Anything else you'd like to say through the movies?",
        user_id = 2,
        task_id = 5
    )

    db.session.add(comment_1)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()