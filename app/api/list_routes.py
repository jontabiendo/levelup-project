from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import List, db
from .auth_routes import validation_errors_to_error_messages
from app.forms import ListForm

list_routes = Blueprint('lists', __name__)

@list_routes.route('/')
@login_required
def get_lists():
    """
    Query for logged in user's lists and return them in a list of dictionaries
    """
    lists = List.query.filter(List.user_id == current_user.id).all()
    print(lists)

    return {"lists": [list.to_dict() for list in lists]}

@list_routes.route('/new', methods=["POST"])
# @login_required
def post_list():
    """
    Create a new list for the logged in user
    """
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_list = List(
            title = form.data['title'],
            category = form.data['category'],
            description = form.data['description'],
            is_public = form.data['is_public'],
            user_id = current_user.id
        )
        db.session.add(new_list)
        db.session.commit()

        return {new_list.id: new_list.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}

@list_routes.route('/<int:listId>/edit', methods=["PUT"])
@login_required
def edit_list(listId):
    """
    Edit the currently viewed list for the logged in user
    """
    list = List.query.get(listId)
    req = request.get_json()

    if list is None:
        return {'errors': "List does not exist"}, 404
    if list.user_id is not current_user.id:
        return {'errors': "Unauthorized access"}, 403
        
    list.title = req['title'],
    list.category = req['category'],
    list.description = req['description'],
    list.is_public = req['isPublic'],
    print("*************", list.to_dict())

    db.session.commit()

    return {"list": list.to_dict()}

@list_routes.route('/<int:listId>/delete', methods=["DELETE"])
@login_required
def delete_list(listId):
    list = List.query.get(listId)

    db.session.delete(list)
    db.session.commit()

    return {"success": "list deleted"}