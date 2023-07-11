from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text

def seed_lists():
    gandalf_personal_1 = List(
        title = "my daily list",
        category = "",
        description = "Daily tasks",
        is_public= True,
        user_id = 2
    )

    gandalf_personal_2 = List(
        title = "To defeat Sauron",
        category = "work",
        description = "Tasks to complete to save Middle Earth",
        is_public = False,
        user_id = 2
    )

    fellowship_list = List(
        title = "Fellowship tasks",
        category = "work",
        description = "Tasks for Fellowship members",
        is_public = False,
        user_id = 2,
        team_id = 1
    )
    
    dark_lord_team_list = List(
        title = "Dark Forces",
        category = "Finance",
        description = "Tasks for the dark lord's forces",
        is_public = False,
        user_id = 4,
        team_id = 2
    )

    db.session.add(gandalf_personal_1)
    db.session.add(gandalf_personal_2)
    db.session.add(fellowship_list)
    db.session.add(dark_lord_team_list)
    db.session.commit()
    

def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))
        
    db.session.commit()