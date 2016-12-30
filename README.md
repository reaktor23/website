Reaktor 23 website
==================

This is another approach for a new website for http://reaktor23.org based
on [pelican](http://blog.getpelican.com/).


First steps
-----------

1. Clone repository with

        git clone git@github.com:Reaktor23/website.git reaktor23-website
        cd reaktor23-website

2. Load submodules

        git submodules init
        git submodules update

3. Setup a virtual env and install pelican

        virtualenv env
        source env/bin/activate
        pip install -r requirements.txt

4. Change or add new website content inside the `content/` folder
