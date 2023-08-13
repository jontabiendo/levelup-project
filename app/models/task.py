from .db import db, environment, SCHEMA, add_prefix_for_prod

class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), default="")
    priority = db.Column(db.String(20), default="low")
    is_complete = db.Column(db.Boolean, default=False)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("lists.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    list = db.relationship("List", back_populates="tasks")
    user = db.relationship("User", back_populates="tasks")
    comments = db.relationship("Comment", back_populates="task", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'priority': self.priority,
            'is_complete': self.is_complete,
            'list_id': self.list_id,
            'user_id': self.user_id,
            'comments': {comment.id: comment.to_dict() for comment in self.comments} or {}
        }