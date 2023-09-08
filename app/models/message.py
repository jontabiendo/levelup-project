# from .db import db, environment, SCHEMA, add_prefix_for_prod

# class Message(db.Model):
#     __tablename__ = "messages"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
#     recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
#     created_at = db.Column(db.DateTime, default=db.func.now())
#     content = db.Column(db.String, nullable=False)

#     sender = db.relationship("User", foreign_keys=[sender_id], back_populates="sent_messages")
#     recipient = db.relationship("User", foreign_keys=[recipient_id], back_populates="received_messages")