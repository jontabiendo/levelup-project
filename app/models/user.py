from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, 
    unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    lists = db.relationship("List", back_populates="user")
    tasks = db.relationship("Task", back_populates="user")
    team = db.relationship("Team", back_populates="creator")
    user_teams = db.relationship("Team_Member", back_populates='member')
    comments = db.relationship("Comment", back_populates="user")

    # team_association = db.relationship("Team_Member", back_populates="members", cascade = "all, delete")

    # teams = association_proxy("team_association", "teams", creator=lambda x: Team_Member(teams =x))

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "first_name": self.first_name,
            "last_name": self.last_name
        }
