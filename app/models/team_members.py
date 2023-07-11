from .db import db, environment, SCHEMA, add_prefix_for_prod

team_members = db.Table(
    "team_members",
    db.Model.metadata,
    db.Column("members", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("teams", db.Integer, db.ForeignKey(add_prefix_for_prod('teams.id')), primary_key=True)
)

