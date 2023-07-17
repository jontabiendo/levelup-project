from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import List, Task, db
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
    print("*****",request.data,"*********")

    if list is None:
        return {'errors': "List does not exist"}, 404
    if list.user_id is not current_user.id:
        return {'errors': "Unauthorized access"}, 403
    
    # form = ListForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # print(form.data['title'], form.data['category'], form.data['description'], form.data['is_public'])

    # if form.validate_on_submit():
    #     list.title = form.data['title'],
    #     list.category = form.data['category'],
    #     list.description = form.data['description'],
    #     list.is_public = form.data['is_public']

    #     db.session.commit()

    req = request.get_json()
    # print("********", req)
    # if len(req['title']) > 1 and len(req['title']) <= 50 and req['category'] is not list.title:
    #     list.title = req['title'],
    # list.category = req['category'],
    # if len(req['description']) <= 255 and req['description'] is not list.description:
    #     list.description = req['description'],
    # if type(req['is_public']) is bool:
    #     list.is_public = req['is_public'],
        # item = FeeLineItem.query.get(id)
    for key, value in req:
        setattr(list, key, value)
    db.session.add(list)
    db.session.commit()

    # db.session.commit()

    return {"list": list.to_dict()}
    
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@list_routes.route('/<int:listId>/delete', methods=["DELETE"])
@login_required
def delete_list(listId):
    list = List.query.get(listId)

    db.session.delete(list)
    db.session.commit()

    return {"success": "list deleted"}

@list_routes.route('/<int:listId>/add-task', methods=["POST"])
@login_required
def add_task_to_list(listId):
    new_task = Task(
        description = "",
        list_id = listId
    )

    db.session.add(new_task)
    db.session.commit()

    return {new_task.id: new_task.to_dict()}