from .db import db, environment, SCHEMA, add_prefix_for_prod

# team_members = db.Table(
#     "team_members",
#     db.Model.metadata,
#     db.Column("member_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
#     db.Column("team_id", db.Integer, db.ForeignKey(add_prefix_for_prod('teams.id')), primary_key=True)
# )

class Team_Member(db.Model):
    __tablename__ = 'team_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("teams.id")), primary_key = True)

    member = db.relationship("User", back_populates="user_teams")
    team = db.relationship("Team", back_populates="team_members")

    def team_to_dict(self):
        return {**self.team.to_dict()}
    
    def member_to_dict(self):
        return {**self.member.no_eager_dict()}

    # members = db.relationship("User", back_populates="team_association")

    # teams = db.relationship("Team", back_populates="user_association")
