from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Team, Team_Member, db
from .auth_routes import validation_errors_to_error_messages
from app.forms import TeamForm

team_routes = Blueprint('teams', __name__)

@team_routes.route('/<int:user_id>/create-team', methods=["POST"])
@login_required
def create_team(user_id):
    """
    Creates a new team based on the given form data
    """
    print("arrived at api route")
    form = TeamForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("*** validating form ***", form.data)
    
    if form.validate_on_submit():
        new_team = Team(
            name = form.data['name'],
            description = form.data['description'],
            created_by = user_id
        )
        print("*** new team created ***", new_team)
        db.session.add(new_team)
        db.session.commit()

        new_member = Team_Member(
            member_id = user_id,
            team_id = new_team.id
        )

        db.session.add(new_member)
        db.session.commit()

        return {new_team.id: new_team.to_dict()}
    
    return {"errors": validation_errors_to_error_messages(form.errors)}

@team_routes.route('/<int:team_id>/delete', methods=["DELETE"])
@login_required
def delete_team(team_id):
    """
    Deletes the team from the database and cascade deletes team members of that team instance
    """

    team_to_delete = Team.query.get(team_id)

    db.session.delete(team_to_delete)
    db.session.commit()

    return {"success": "team deleted"}