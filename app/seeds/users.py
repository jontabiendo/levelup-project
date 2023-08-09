from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io',
        password='password',
        first_name="Demo",
        last_name="User")
    
    gandalf = User(
        email='gandalf@aa.io',
        password='password',
        first_name="Gandalf",
        last_name="Greyhame")
    
    legolas = User(
        email='legolas@aa.io',
        password='password',
        first_name="Legolas",
        last_name="Legolos")
    
    sauron = User(
        email='sauron@aa.io',
        password='password',
        first_name='Sauron',
        last_name="Ring"
    )

    frodo = User(
        email= "frodo@example.com",
        password= "password",
        first_name= "Frodo",
        last_name= "Baggins"
    )
    
    aragorn = User(
    email= "aragorn@example.com",
    password= "password",
    first_name= "Aragorn",
    last_name= "Dunedain"
    )

    gimli = User(
    email= "gimli@example.com",
    password= "password",
    first_name= "Gimli",
    last_name= "son of Gloin"
    )

    arwen = User(
    email= "arwen@example.com",
    password= "password",
    first_name= "Arwen",
    last_name= "Evenstar"
    )

    sam = User(
    email= "samwise@example.com",
    password= "password",
    first_name= "Samwise",
    last_name= "Gamgee"
    )
  
    gollum = User(
    email= "gollum@example.com",
    password= "password",
    first_name= "Gollum",
    last_name= "Smeagol"
    )

    galadriel = User(
    email= "galadriel@example.com",
    password= "password",
    first_name= "Galadriel",
    last_name= "Lady of Lothlorien"
    )

    eowyn = User(
    email= "eowyn@example.com",
    password= "password",
    first_name= "Eowyn",
    last_name= "Shieldmaiden of Rohan"
    )



    db.session.add(demo)
    db.session.add(gandalf)
    db.session.add(legolas)
    db.session.add(sauron)
    db.session.add(frodo)
    db.session.add(aragorn)
    db.session.add(gimli)
    db.session.add(arwen)
    db.session.add(gollum)
    db.session.add(eowyn)
    db.session.add(sam)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()