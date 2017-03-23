#!/usr/bin/env python3
# -*- coding: utf-8 -*- #

import os
import sys
import shutil
from markdown import Markdown

markdown = Markdown(extensions=['meta', 'extra', 'codehilite'], output_format='html5')

def render(source, output):
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
                dstpath = os.path.join(output, strip_dir(srcpath[:-3])) + ".html"
                print("converting {} to {}".format(srcpath, dstpath))
                with open(srcpath, encoding='utf-8') as srcfile:
                    md = srcfile.read()
                    html = markdown.convert(md)
                    with open(dstpath, 'w', encoding='utf-8') as dstfile:
                        dstfile.write(html)

def strip_dir(path, count=1):
    return '/'.join(path.split('/')[count:])


if __name__ == '__main__':
    source = sys.argv[1]
    output = sys.argv[2]
    render(source, output)
