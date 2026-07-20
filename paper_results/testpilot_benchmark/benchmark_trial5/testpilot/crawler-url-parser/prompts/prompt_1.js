Your task is to write a test for the following function:
```
crawler-url-parser.parse(currentUrlStr, baseUrlStr)
```

This function is defined as follows:
```
function parse(currentUrlStr, baseUrlStr) {
	let ret = {
		url: null,
		baseurl: null,
		protocol: null,
		host: null,
		domain: null,
		subdomain: null,
		path: null,
		search: null,
		querycount: 0
	}
	if (typeof currentUrlStr === 'undefined') return null;
	if (currentUrlStr && _has_illegal_chars(currentUrlStr)) return null;
	if (baseUrlStr && _has_illegal_chars(baseUrlStr)) return null;

	currentUrlStr = currentUrlStr.replace(/^\/\//, 'http://');
	currentUrlStr = currentUrlStr.replace(/#.*$/, '');

	if (baseUrlStr) {
		baseUrlStr = baseUrlStr.replace(/^\/\//, 'http://');
		baseUrlStr = baseUrlStr.replace(/#.*$/, '');
	} else {
		if (!/^\.*\/|^(?!localhost)\w+:/.test(currentUrlStr)) {
			currentUrlStr = currentUrlStr.replace(/^(?!(?:\w+:)?\/\/)/, 'http://');
		}
	}

	let parsedUrl = URL.parse(currentUrlStr, true, true);
	delete parsedUrl.hash;

	if (parsedUrl.protocol && parsedUrl.protocol != 'http:' && parsedUrl.protocol != 'https:') return null;

	//current url is relative like "abc", "/abc" or "../abc"
	if (parsedUrl.host == null && baseUrlStr) {
		let parsedBaseUrl = URL.parse(baseUrlStr, true, true);
		delete parsedUrl.hash;
		ret.baseurl = URL.format(parsedBaseUrl);

		let absoluteUrl = URL.parse(URL.resolve(parsedBaseUrl, parsedUrl));
		currentUrlStr = URL.format(absoluteUrl);
	}

	parsedUrl = URL.parse(currentUrlStr, true, true);
	delete parsedUrl.hash;

	ret.url = URL.format(parsedUrl);
	ret.protocol = parsedUrl.protocol;
	ret.host = parsedUrl.host;
	ret.path = parsedUrl.pathname;

	if (ret.host) {
		let parsedHost = psl.parse(ret.host);
		ret.domain = parsedHost.domain;
		ret.subdomain = parsedHost.subdomain;
	}

	ret.search = parsedUrl.search;
	ret.querycount = parsedUrl.search ? parsedUrl.search.split("=").length - 1 : 0;

	return ret;
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');
describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.parse', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.