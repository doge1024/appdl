# -×- coding: utf-8 -*-
from flask_script import Manager, Server
from app import app

manager = Manager(app)
manager.add_command("runserver",
                    Server(host='localhost',
                           port=5000,
                           use_debugger=True))

@manager.command
def hello():
    print("hello")

if __name__ == "__main__":
    manager.run()