Your task is to write a test for the following function:
```
crawler-url-parser.gettype(linkurl, pageurl)
```

This function is defined as follows:
```
function gettype(linkurl, pageurl) {

	if (typeof linkurl == "string") linkurl = parse(linkurl);
	if (typeof pageurl == "string") pageurl = parse(pageurl);

	let linkurl_subdomain_len = linkurl.subdomain ? linkurl.subdomain.length : 0;
	let pageurl_subdomain_len = pageurl.subdomain ? pageurl.subdomain.length : 0;

	let linkurl_path = linkurl.path ? linkurl.path : "";
	let pageurl_path = pageurl.path ? pageurl.path : "";
	linkurl_path = linkurl_path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
	pageurl_path = pageurl_path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');

	let linkurl_parts = linkurl_path.split("/").filter(function (elem, index, array) {
		return elem.length > 0
	});
	let pageurl_parts = pageurl_path.split("/").filter(function (elem, index, array) {
		return elem.length > 0
	});

	if (pageurl.host == linkurl.host) {

		let part_count_diff = linkurl_parts.length - pageurl_parts.length;

		if (part_count_diff == 0) {
			let linkurl_without_last_part = linkurl_path.replace(/(\/[^\/]*)[\/]?$/, "");
			let pageurl_without_last_part = pageurl_path.replace(/(\/[^\/]*)[\/]?$/, "");
			if (linkurl_without_last_part == pageurl_without_last_part) return "samelevel"
		} else if (part_count_diff == 1) {
			if (linkurl_path.includes(pageurl_path)) return "sublevel";
		} else if (part_count_diff == -1) {
			if (pageurl_path.includes(linkurl_path)) return "uplevel";
		}

		return "internal";
	} else if (linkurl.domain == pageurl.domain) {
		if (linkurl_subdomain_len < pageurl_subdomain_len) return "updomain";
		return "subdomain";
	}

	return "external";
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');
describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.gettype', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.