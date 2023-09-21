from flask_socketio import SocketIO, emit, send, join_room, leave_room, disconnect
from flask_login import current_user
from flask import request
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://levelup-lknw.onrender.com",
        "https://levelup-lknw.onrender.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("connect")
def on_connect():
    print("*** a user connected ***")

# users = {}
rooms = {}

@socketio.on("online")
def on_online(data):
    print("***", data, "***")
    for team in data['teams']:
        if team not in rooms:
            rooms[team] = []
        if data['user'] not in rooms[team]:
            join_room(team)
            rooms[team].append(data['user'])
    print("*** rooms joined: ", rooms, " ***")
    emit("online_res", rooms)

# handle joining room 1
# @socketio.on("join")
# def on_join(data):
#     first_name = current_user.to_dict()['first_name']
#     room = data['name']
#     join_room(room)
#     print("***")
#     print(first_name + " has entered the " + room)
#     print("***")
#     emit("chat", {"user": first_name, "msg": first_name + " has entered the " + room}, to=room)

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    room = data['room']
    emit("chat", {"user": data['user'], "msg": data['msg']}, to=room)

@socketio.on("go_offline")
def go_offline(data):
    print("*** leaving rooms: ", rooms, data, " ***")
    for team in data['teams']:
        print(rooms[team])
        
        rooms[team] = list(filter(lambda x: x != data['user'], rooms[team]))

        print(rooms[team])
        leave_room(team)
    print("*** ", rooms, " ***")
    emit("online_res", rooms)
    disconnect()

@socketio.on("disconnect")
def on_disconnect():
    print("*** ",  " disconnected ***")
