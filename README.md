Reaktor 23 website
==================

This is another approach for a new website for http://reaktor23.org

## Setup

Clone this repo:
```
git clone https://github.com/reaktor23/website.git
```

Setup the virtual env:
```
virtualenv venv
. ./venv/bin/activate
pip install -r requirements.txt
```

## Build the website

```
python website.py render
```

## Preview the website

```
python website.py preview
```
