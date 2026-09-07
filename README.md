Reaktor23 website
==================

The website behind http://reaktor23.org made using the
[Hugo static site generator](https://gohugo.io/).

![Deploy website](https://github.com/reaktor23/website/workflows/Deploy%20website/badge.svg?branch=master)

Quickstart
----------

1. Install hugo: see https://gohugo.io/overview/installing/
2. Clone this repository

    ```
    git clone https://github.com/reaktor23/website.git reaktor23-website
    cd reaktor23-website
    ```
3. Mess around with the content ... or not
4. View page on your machine with `hugo server` and visiting
   http://localhost:1313

Deploying
---------

All commits to the master branch will be deployed automatically via GitHub Actions to
https://reaktor23.org.

Custom shortcodes
-----------------

Shortcodes are used to enable users to create certain HTML output from the
markup pages.

You can use Emojis with their shortcodes as listed
[here](https://www.webfx.com/tools/emoji-cheat-sheet/)  :heart_eyes:

Here are our implemented shortcodes for documentation:

**Thumbnail**

Generates a nice looking frame around the image. Also, clicking on it will show
a big size version.

    {{< thumbnail src="url/to/img.jpg" width="200px" >}}
    {{< thumbnail src="url/to/img.jpg" width="x200" class="horizontal" >}}
    {{< thumbnail src="url/to/img.jpg" width="x200" caption="This picture illustrates something" >}}

_src_ is mandatory, _width_ controls the image width, _class_ enables us to
align the images horizontally or do other stuff (see Bootstrap) and _caption_
will show a text underneath the image.

**Font Awesome**

Lets you insert a Font Awesome Icon into your page.

    {{< fa icon="github" size="3" >}}

_icon_ is mandatory, _size_ controls the icon size (1,2,3,4,5)

**Vimeo**

Lets you embed a Vimeo video.

    {{< vimeo id="43611049" >}}

_id_ is mandatory

**Youtube**

Lets you embed a YouTube video.

    {{< youtube id="aqz-KE-bpKQ" >}}

**Box**

Lets you put content in a Bootstrap alert box.

    {{% box type="danger" %}}
    Your content here 
    {{% /box %}}

_type_ is one of the bootstrap classes for alerts (primary, secondary, success,
danger, warning, info, light, dark), defaults to info.

**Table**

Wraps a markdown table and makes it a bit more fancy by adding the bootstrap
table class

    {{% table %}}
    | A | B |
    | --- | --- |
    | 1 | 2 |
    | 3 | 4 |
    {{% /table %}}
