from .db import db, environment, SCHEMA, add_prefix_for_prod

class Request(db.Model):
    __tablename__ = "requests"

    if environment == 'production':
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    requestor_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    requestee_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    team_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("teams.id")))
    status = db.Column(db.Boolean, default=False)

    requestor = db.relationship("User", foreign_keys=[requestor_id], back_populates="sent_requests")
    requestee = db.relationship("User", foreign_keys=[requestee_id], back_populates="received_requests")
    team_invitation = db.relationship("Team", back_populates="invitations")

    def dict_for_user(self):
        return {
            "id": self.id,
            "sender": self.requestor.no_eager_dict(),
            "recipient": self.requestee.no_eager_dict(),
            "team": self.team_invitation.no_eager_dict(),
            "status": self.status
        }
    
    def dict_for_team(self):
        return {
            "id": self.id,
            "sender": self.requestor.no_eager_dict(),
            "recipient": self.requestee.no_eager_dict(),
            "status": self.status,
            "team_id": self.team_id
        }
