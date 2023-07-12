from .db import db, environment, SCHEMA, add_prefix_for_prod

class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False, default = "untitled")
    category = db.Column(db.String(50))
    in_progress = db.Column(db.Boolean, default=True)
    description = db.Column(db.String(255))
    is_public = db.Column(db.Boolean, default = False)
    team_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("teams.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates="lists")
    tasks = db.relationship("Task", back_populates="list")
    team = db.relationship("Team", back_populates="lists")

    def to_dict(self):
        task_dict = {task.id: task.to_dict() for task in self.tasks}

        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'in_progress': self.in_progress,
            'description': self.description,
            'is_public': self.is_public,
            'team_id': self.team_id,
            'user_id': self.user_id,
            'tasks': [task.to_dict() for task in self.tasks]
        }
    
    def to_dict_no_eager(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'in_progress': self.in_progress,
            'description': self.description,
            'is_public': self.is_public,
            'team_id': self.team_id,
        }