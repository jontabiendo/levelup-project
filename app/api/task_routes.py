from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Task, db
from .auth_routes import validation_errors_to_error_messages

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/<int:taskId>/delete', methods=["DELETE"])
@login_required
def delete_task(taskId):
    task = Task.query.get(taskId)

    db.session.delete(task)
    db.session.commit()

    return {"success": "task deleted"}
