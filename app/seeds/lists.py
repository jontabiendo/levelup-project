from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text

def seed_lists():
    demo_list = List(
        title = "demo list",
        category = "Groceries",
        description = "description",
        is_public = False,
        user_id = 1
    )

    gandalf_personal_1 = List(
        title = "my daily list",
        category = "Personal",
        description = "Daily tasks",
        is_public= True,
        user_id = 2
    )

    gandalf_personal_2 = List(
        title = "To defeat Sauron",
        category = "Work",
        description = "Tasks to complete to save Middle Earth",
        is_public = False,
        user_id = 2
    )

    fellowship_list = List(
        title = "Fellowship tasks",
        category = "Work",
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

    legolas_list = List(
        title = "Practice Archery",
        category = "Skills",
        description = "Hone archery skills at the elven range.",
        is_public = False,
        user_id = 3
    )

    frodo_list = List(
        title= "Prepare for Journey",
        category= "Adventure",
        description= "Pack essentials, gather supplies, and meet companions.",
        is_public= False,
        user_id= 5
    )

    aragorn_list = List(
        title= "Prepare for Battle",
        category= "War Campaign",
        description= "Review battle strategies, check equipment, and inspire the troops.",
        is_public= False,
        user_id= 6
    )

    gimli_list = List(
        title= "Forge Legendary Axe",
        category= "Craftsmanship",
        description= "Create a mighty dwarven axe infused with ancient runes.",
        is_public= False,
        user_id= 7
    )

    arwen_list = List(
        title= "Create Elven Tapestry",
        category= "Artistry",
        description= "Weave a tapestry depicting the beauty of Rivendell.",
        is_public= False,
        user_id= 8
    )

    sam_list = List(
        title= "Tend to the Garden",
        category= "Hobbiton",
        description= "Plant new flowers and harvest vegetables from the garden.",
        is_public= False,
        user_id= 9
    )

    gollum_list = List(
        title= "Find Precious Fish",
        category= "Hunting",
        description= "Hunt for a tasty fish to satisfy the Precious.",
        is_public= False,
        user_id= 10
    )

    galadriel_list = List(
        title= "Bless the Woodland Realm",
        category= "Ruler's Duties",
        description= "Bestow blessings upon the realm's forests and creatures.",
        is_public= False,
        user_id= 11
    )

    eowyn_list = List(
        title= "Train with Sword",
        category= "Combat Skills",
        description= "Practice swordplay and improve combat techniques.",
        is_public= False,
        user_id= 12
    )

    db.session.add(demo_list)
    db.session.add(gandalf_personal_1)
    db.session.add(gandalf_personal_2)
    db.session.add(fellowship_list)
    db.session.add(dark_lord_team_list)
    db.session.add(legolas_list)
    db.session.add(frodo_list)
    db.session.add(aragorn_list)
    db.session.add(gimli_list)
    db.session.add(arwen_list)
    db.session.add(sam_list)
    db.session.add(gollum_list)
    db.session.add(galadriel_list)
    db.session.add(eowyn_list)
    db.session.commit()
    

def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))
        
    db.session.commit()