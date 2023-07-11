from app.models import db, Team_Member, environment, SCHEMA
from sqlalchemy.sql import text

def seed_team_members():
    fellowship_gandalf = Team_Member(
        member_id = 2,
        team_id = 1
    )

    fellowship_legolas = Team_Member(
        member_id = 3,
        team_id = 1
    )

    dark_sauron = Team_Member(
        member_id = 4,
        team_id = 2
    )

    db.session.add(fellowship_gandalf)
    db.session.add(fellowship_legolas)
    db.session.add(dark_sauron)
    db.session.commit()


def undo_team_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.team_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM team_members"))
        
    db.session.commit()