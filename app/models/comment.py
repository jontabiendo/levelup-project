from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    task_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tasks.id")))
    created_at = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates="comments")
    task = db.relationship("Task", back_populates="comments")