# encoding: utf-8
from flask import Flask, request, render_template, redirect
import requests
import json
from app import app

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/api/transform/appicon')
# ?url=xxx
def transform_appicon():
    resp = request_get(request.args.get('url'))
    return (resp.content, resp.status_code, resp.headers.items())

# ?key=111&page=1
@app.route('/api/search')
def search():
    key = request.args.get('key')
    page = request.args.get('page')
    pageLimit = request.args.get('pageLimit')
    resp = send_request(key, page, pageLimit)
    return (resp.text, resp.status_code, resp.headers.items())

def request_get(url):
    try:
        response = requests.get(url)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except requests.exceptions.RequestException:
        return None

def send_request(key, page, pageLimit):
    # Request

    key = key if key else ""
    page = int(page) if (page and int(page) > 0) else 0
    pageLimit = int(pageLimit) if ( pageLimit and int(pageLimit) > 0) else 15

    try:
        response = requests.post(
            url="http://"+"jsondata"+".2"+"5"+"pp"+".com"+"/index.html",
            headers={
                "Accept": "application/json;application/vnd.gitbook.format.v3",
                "Tunnel-Command": "0X"+"FE"+"30"+"62"+"20",
                "Content-Type": "application/json; charset=utf-8",
            },
            data=json.dumps({
                "clFlag": 0,
                "dcType": 3,
                "rw": "1",
                "dcLevel": "0",
                "pageLimit": pageLimit,
                "keyword": key,
                "page": page
            })
        )
        return response
    except requests.exceptions.RequestException:
        return None