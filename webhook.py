from __future__ import print_function, unicode_literals
from bottle import route, run, request
from io import open
from subprocess import call
import hmac
from hashlib import sha1

import webhookconfig as cfg

@route('/', method='POST')
def index():
    header_signature = request.headers.get('X-Hub-Signature')
    if header_signature is None:
        abort(403)
    sha_name, signature = header_signature.split('=')
    if sha_name != 'sha1':
        abort(501)
    mac = hmac.new(cfg.secret, msg=request.body.read(), digestmod=sha1)
    if mac.hexdigest() == signature:
        call(['git', 'pull'], cwd=cfg.repo)
        call(['hugo', '-b', cfg.domain, '-d', cfg.dest], cwd=cfg.repo)
        return 'OK'
    else:
        abort(401, "You Can't Do That")

run(host=cfg.host, port=cfg.port)
