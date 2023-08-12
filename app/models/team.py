from .db import db, environment, SCHEMA, add_prefix_for_prod

class Team(db.Model):
    __tablename__ = 'teams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.DateTime, default=db.func.now())

    creator = db.relationship("User", back_populates="owned_teams")
    lists = db.relationship("List", back_populates="team", cascade="all, delete")
    team_members = db.relationship("Team_Member", back_populates='team', cascade="all, delete")
    invitations = db.relationship("Request", back_populates="team_invitation", cascade="all, delete")

    # user_association = db.relationship("Team_Member", back_populates="teams", cascade = "all, delete")

    # members = association_proxy("user_association", "users", creator=lambda x: Team_Member(members=x))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at,
            "lists": {list.id: list.to_dict() for list in self.lists},
            "created_by": self.created_by,
            "members": {member.id: member.member_to_dict() for member in self.team_members},
            "invitations": {invite.id: invite.dict_for_team() for invite in self.invitations}
        }
    
    def no_eager_dict(self):
        return{
            "id": self.id,
            "name": self.name,
            "description": self.description,
        }