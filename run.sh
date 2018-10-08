#!/usr/bin/env bash 

ini_path=`cd $(dirname $0); pwd`
ini_path="${ini_path}/dl-flask/uwsgi.ini"

# 我自己服务器的操作
source ~/.bashrc
workon pyflask

uwsgi $ini_path

# 如何kill
# ps -e | grep uwsgi
# kill -9 <第一个pid>
