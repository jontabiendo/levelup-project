from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Team, Team_Member, List, db
from .auth_routes import validation_errors_to_error_messages
from app.forms import TeamForm, ListForm

team_routes = Blueprint('teams', __name__)

@team_routes.route('/<int:user_id>/create-team', methods=["POST"])
@login_required
def create_team(user_id):
    """
    Creates a new team based on the given form data
    """
    form = TeamForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        new_team = Team(
            name = form.data['name'],
            description = form.data['description'],
            created_by = user_id
        )
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

@team_routes.route('/<int:team_id>/edit', methods=["PUT"])
@login_required
def edit_team(team_id):
    """
    Edits the team's name and description based on the id given in the params
    """
    team_to_edit = Team.query.get(team_id)

    if team_to_edit is None:
        return {"error": "team not found"}, 404
    if current_user.id is not team_to_edit.created_by:
        return {"error": "you are not authorized to edit this team"}
    
    form = TeamForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        team_to_edit.name = form['name'].data
        team_to_edit.description = form['description'].data

        db.session.add(team_to_edit)
        db.session.commit()

        return {team_to_edit.id: team_to_edit.to_dict()}

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@team_routes.route('/<int:team_id>/leave', methods=["DELETE"])
@login_required
def leave_team(team_id):
    """
    Removes the current_user from the team by team_id by deleting record from team_members table matching both criteria
    """
    member = Team_Member.query.filter(Team_Member.team_id == team_id).filter(Team_Member.member_id == current_user.id).first()

    if member is None:
        return {"error": "Cannot leave a team you are not part of"}, 400
    
    db.session.delete(member)

    db.session.commit()

    return {"success": "You have been successfully removed from team"}
    
@team_routes.route('/<int:team_id>/lists', methods=['POST'])
@login_required
def new_team_list(team_id):
    """
    Create a new list for the team by team_id
    """
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_list = List(
            title = form.data['title'],
            category = form.data['category'],
            description = form.data['description'],
            is_public = form.data['is_public'],
            user_id = current_user.id,
            team_id = form.data['team']
        )
        db.session.add(new_list)
        db.session.commit()

        return {new_list.id: new_list.to_dict()}
    return{"errors": validation_errors_to_error_messages(form.errors)}