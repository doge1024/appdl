# encoding: utf-8
from flask import Flask, request, render_template, redirect
import requests
import json
from app import app

@app.route("/")
def index():
    return render_template("index.html")

# ?key=111
@app.route('/api/search')
def search():
    resp = send_request(request.args.get('key'))
    return (resp.text, resp.status_code, resp.headers.items())

def send_request(key):
    # Request
    # POST http://jsondata.25pp.com/index.html

    try:
        response = requests.post(
            url="http://jsondata.25pp.com/index.html",
            headers={
                "Accept": "application/json;application/vnd.gitbook.format.v3",
                "Tunnel-Command": "0XFE306321",
                "Content-Type": "application/json; charset=utf-8",
            },
            data=json.dumps({
                "clFlag": 0,
                "dcType": 3,
                "rw": "1",
                "dcLevel": "0",
                "pageLimit": 30,
                "keyword": key,
                "page": 0
            })
        )
        return response
    except requests.exceptions.RequestException:
        return None