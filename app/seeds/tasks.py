from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tasks():
    task_1 = Task(
        description = "Say 'Fool of a Took'",
        priority = "high",
        is_complete = False,
        list_id = 1,
        user_id = 2
    )

    task_2 = Task(
        description = "Speak in riddles",
        priority = "medium",
        is_complete = False,
        list_id = 1,
        user_id = 2
    )

    task_3 = Task(
        description = "Worry about Frodo",
        priority = "low",
        is_complete = True,
        list_id = 1,
        user_id = 2
    )

    task_4 = Task(
        description = "Become 'Gandalf the White'",
        priority = "high",
        is_complete = False,
        list_id = 2,
        user_id = 2
    )

    task_5 = Task(
        description = "Offer Frodo my bow",
        priority = "medium",
        is_complete = False,
        list_id = 3,
        user_id = 3
    )

    task_6 = Task(
        description = "Plunge Middle Earth into darkness",
        priority = "High",
        is_complete = False,
        list_id = 4,
        user_id = 4
    )

    db.session.add(task_1)
    db.session.add(task_2)
    db.session.add(task_3)
    db.session.add(task_4)
    db.session.add(task_5)
    db.session.add(task_6)
    db.session.commit()

def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))
        
    db.session.commit()