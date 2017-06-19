#!/usr/bin/env python3
# -*- coding: utf-8 -*- #

import os
import sys
import shutil
import argparse
import http.server
import socketserver
from markdown import Markdown

class Website:

    def __init__(self, args):
        self.args = args
        self.md = Markdown(extensions=['meta', 'extra', 'codehilite'], output_format='html5')
        print(args)
        getattr(self, args.task)()

    def render(self):
        source = self.args.source
        output = self.args.output
        if os.path.isdir(output):
            print("cleaning output folder {}".format(output))
            shutil.rmtree(output)

        print("copy stuff from {} to {}".format(source, output))
        shutil.copytree(source, output)

        print("scanning for special content")
        for root, dirs, files in os.walk(source):
            for f in files:
                if f.endswith('.md'):
                    srcpath = os.path.join(root, f)
                    dstpath = self._generate_dst_path(source, output, srcpath)
                    print("converting {} to {}".format(srcpath, dstpath))
                    with open(srcpath, encoding='utf-8') as srcfile:
                        md = srcfile.read()
                        html = self.md.convert(md)
                        with open(dstpath, 'w', encoding='utf-8') as dstfile:
                            dstfile.write(html)

    def preview(self):
        os.chdir(self.args.output)
        handler = http.server.SimpleHTTPRequestHandler
        with socketserver.TCPServer(("", self.args.port), handler) as httpd:
            print(f"serving at port {self.args.port} content of {self.args.output}")
            httpd.serve_forever()

    def clean(self):
        print(f"clean output directory {self.args.output}")
        shutil.rmtree(self.args.output)

    def _generate_dst_path(self, source, output, path, extension='.html'):
        path, filename = os.path.split(path)
        path = path.replace(source,output)
        filename = f"{os.path.splitext(filename)[0]}{extension}"
        return os.path.join(path, filename)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Reaktor23 static site generator.')
    parser.add_argument('task', type=str, choices=['render','preview','clean'], help='select one of the available tasks to execute')
    parser.add_argument('--source', '-s', type=str, default='content', help='source directory for site generation')
    parser.add_argument('--output', '-o', type=str, default='output', help='output directory for site generation')
    parser.add_argument('--port', '-p', type=int, default=8080, help='port for preview webserver')
    args = parser.parse_args()
    website = Website(args)
