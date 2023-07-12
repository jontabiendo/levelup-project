from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import List

list_routes = Blueprint('lists', __name__)

@list_routes.route('/')
@login_required
def users():
    """
    Query for logged in user's lists and return them in a list of dictionaries
    """
    lists = List.query.filter(List.user_id == current_user.id).all()
    print(lists)

    return {"lists": [list.to_dict() for list in lists]}