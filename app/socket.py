from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask_login import current_user
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://levelup-lknw.onrender.com",
        "https://levelup-lknw.onrender.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins, logger=True, engineio_logger=True)

# @socketio.on("connect")
# def on_connect(data):
#     print("***")
#     print("connecting...", current_user)
#     print("***")

users = {}

@socketio.on("online")
def on_online(user):
    print("***", user, "*** here")
    users[user['socketID']] = user['user']
    emit("online_res", users)

# handle joining room 1
@socketio.on("join")
def on_join(data):
    first_name = current_user.to_dict()['first_name']
    room = data['name']
    join_room(room)
    print("***")
    print(first_name + " has entered the " + room)
    print("***")
    emit("chat", {"user": first_name, "msg": first_name + " has entered the " + room}, to=room)

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    room = data['room']
    emit("chat", {"user": data['user'], "msg": data['msg']}, to=room)

@socketio.on("go_offline")
def go_offline(socket_id):
    del users[socket_id]

    emit("online_res", users)
    socketio.disconnect()
