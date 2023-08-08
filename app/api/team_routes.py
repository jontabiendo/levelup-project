from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Team, db
from .auth_routes import validation_errors_to_error_messages
# from app.forms import TeamForm

team_routes = Blueprint('teams', __name__)

@team_routes.route('/<int:user_id>/create-team', methods=["POST"])
@login_required
def create_team(user_id):
    """
    Creates a new team based on the given form data
    """
    # form = TeamForm()
    
    new_team = Team(
        name
    )