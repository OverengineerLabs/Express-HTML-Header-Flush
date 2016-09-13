Express HTML Header Flush
=========================

This project is a tech demo that shows how to use the
header flush technique.
 
When use it?
------------

If your server doesn't support HTTP/2 and you want a
faster page-load, by making the client start downloading
the JavaScript, CSS and preload files before sending the
body of the document.

What's the benefit?
-------------------

When your website depend on CSS, images or even JavaScript
to render the page, you want to send those files as soon
as you can to the client, so they don't need to wait until
the whole page be loaded to do those downloads sequentially
and block your first time rendering until all files are
available and processed.

Frameworks like React, Angular, Polymer and many other,
allow to create isomorphic pages, this technique have pros
and cons, one of the biggest con, is that your server need
to process the whole page in the backend before send to the
frontend. This is specially tricky when the page depends on
the user session information (aka: authenticated pages), in
those cases is hard to apply good caching techniques.

Those pages that might take seconds to be rendered, can
increase a lot the time of page load and rendering for the
client, since they need to wait the full HTML and then it
might also need to wait the CSS, images and maybe a blocking
JavaScript to finally render the DOM.

By sending the dependencies in the header, the client might
be ready to render the body when this is done. And you might
give a faster experience to your user.

What are the cons?
------------------

When using this technique, you will send the response header
and the HTML head block before finish to process the body.
What also means that if an error occur, or if you want to
send a 404 status code, you need to do it before start sending
this header, because after you start, you can't change.

Example, if you are sending a page, that depends on a async
process that will define the status of it, if you want to use
the correct HTTP Status, you need to wait until you know that
status before start sending the header.
