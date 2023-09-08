from flask_socketio import SocketIO, emit, send, join_room, leave_room
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

@socketio.on("connect")
def on_connect(data):
    first_name = data['user']['first_name'] or data['first_name']
    if data['teams']:
        emit("chat", first_name + " has connected", broadcast=True)

# handle joining room 1
@socketio.on("join")
def on_join(data):
    first_name = data['first_name']
    room = "fellowship"
    join_room(room)
    emit(first_name + " has entered the " + room, to=room)

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)