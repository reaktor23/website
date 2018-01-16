from __future__ import print_function, unicode_literals
from bottle import route, run, request
from io import open
from subprocess import call

import webhookconfig as cfg

@route('/', method='POST')
def index():
    if request.json['hook']['config']['secret'] == cfg.secret:
        call(['git', '-b', cfg.domain, '-d', cfg.dest], cwd=cfg.repo)
        call(['hugo', '-b', cfg.domain, '-d', cfg.dest], cwd=cfg.repo)
        return 'OK'
    else:
        return 'ERROR'

run(host=cfg.host, port=cfg.port)
