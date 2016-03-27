#!/usr/bin/env python

from flask import Flask, send_from_directory
from flask import render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")
@app.route("/obs_plot")
def obs_plot():
    return render_template("obs_plot.html")

@app.route('/static/<path:path>')
def static_proxy_(path):
    # second_static_file will guess the correct MIME type
    return app.send_static_file(path)
@app.route('/data/<path:path>')
def data_proxy_(path):
    return send_from_directory('data', path)

@app.route('/conditions')
def conditions():
    with open("data/Boston_MA.conditions.json") as f:
        data = f.read()
    return data

@app.route('/hourly')
def hourly():
    with open("data/Boston_MA.hourly.json") as f:
        data = f.read()
    return data


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
