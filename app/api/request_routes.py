from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Request, Team, User, Team_Member, db
from .auth_routes import validation_errors_to_error_messages

request_routes = Blueprint("requests", __name__)

@request_routes.route('/invite/send', methods=["POST"])
@login_required
def send_request():
    """
    This route searches for a user based on the sent email, checks to see if that user is already part of the team, and adds a request to that user to join a team
    """
    req = request.get_json()

    user = User.query.filter(User.email == req['email']).first()
    print("***",user, "***")

    if user is None:
        return {"error": "we didn't find a user with that email"}, 404
    
    is_member = Team_Member.query.filter(Team_Member.member_id == user.id).filter(Team_Member.team_id == req['team_id']).first()
    print("***", is_member, "***")

    if is_member is not None:
        return {"error": "user is already part of this team"}, 409
    
    is_requested = Request.query.filter(Request.requestee_id == user.id).filter(Request.team_id == req['team_id']).first()
    print("***", is_requested, "***")

    if is_requested is not None:
        return {"error": "user has already been sent a request to join this team"}, 409
    
    new_request = Request(
        requestor_id = current_user.id,
        requestee_id = user.id,
        team_id = req['team_id']
    )

    db.session.add(new_request)
    db.session.commit()

    print("***", new_request, "***")

    return {new_request.id: new_request.dict_for_team()}, 201

@request_routes.route('<int:request_id/resolve', method=["DELETE"])
@login_required
def resolve_request(request_id):
    """
    This route accepts the request, adds the member to the team and deletes it
    Or declines the request, and deletes the request
    """
    req = request.get_json()

    if req['resolve'] is "accept":
        member = Team_Member(
            member_id = req['member_id'],
            team_id = req['team_id']
        )
