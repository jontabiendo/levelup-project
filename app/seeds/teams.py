from app.models import db, Team, environment, SCHEMA
from sqlalchemy.sql import text

def seed_teams():
    fellowship = Team(
        name = "The Fellowship of the Ring",
        description = "A small, yet highly dependable team of individuals set to escort the ring bearer to Mount Doom",
        created_by = 2,
    )
    dark_forces = Team(
        name = "The Dark Lord's Army",
        description = "The entire Dark Lord's forces at large",
        created_by = 4
    )

    db.session.add(fellowship)
    db.session.add(dark_forces)
    db.session.commit()

def undo_teams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teams RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teams"))
        
    db.session.commit()