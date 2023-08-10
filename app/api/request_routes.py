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

    if user is None:
        return {"error": "we didn't find a user with that email"}, 404
    
    is_member = Team_Member.query.filter(Team_Member.member_id == user.id).filter(Team_Member.team_id == req['team_id']).first()

    if is_member is not None:
        return {"error": "user is already part of this team"}, 409
    
    is_requested = Request.query.filter(Request.requestee_id == user.id).filter(Request.team_id == req['team_id']).first()

    if is_requested is not None:
        return {"error": "user has already been sent a request to join this team"}, 409
    
    new_request = Request(
        requestor_id = current_user.id,
        requestee_id = user.id,
        team_id = req['team_id']
    )

    db.session.add(new_request)
    db.session.commit()

    return new_request.dict_for_team(), 201

@request_routes.route('<int:request_id>/respond', methods=["DELETE"])
@login_required
def resolve_request(request_id):
    """
    This route accepts the request, adds the member to the team and deletes it
    Or declines the request, and deletes the request
    """
    req = request.get_json()
    request_to_resolve = Request.query.get(request_id)

    if req['response'] == "accept":
        member = Team_Member(
            member_id = req['request']['recipient']['id'],
            team_id = req['request']['team']['id']
        )

        if member is not None:
            db.session.delete(request_to_resolve)
            db.session.add(member)

            db.session.commit()
            return {member.team_id: member.team_to_dict()}
        
        else:
            return {"error": "Something went wrong, please try again"}
        
    if req['response'] == "decline":
        db.session.delete(request_to_resolve)

        db.session.commit()

        return {"deleted": "Invitation declined"}, 200
    
    return {"error", "Something went wrong, please try again"}, 500
    



