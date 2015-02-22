default: server watch

server:
	# pushd ./dev; python -m SimpleHTTPServer; popd
	cd dev && python -m SimpleHTTPServer
watch:
	node_modules/watchify/bin/cmd.js src/main.js -o dev/bundle.js