#!/usr/bin/python

##
# Basic static server since XHR doesn't play nice with local static file running
##

import SimpleHTTPServer
import SocketServer

port = 8000

handler = SimpleHTTPServer.SimpleHTTPRequestHandler
httpd = SocketServer.TCPServer(("", port), handler)

print "Serving at port", port
httpd.serve_forever()
