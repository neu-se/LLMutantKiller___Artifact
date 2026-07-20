Your task is to write a test for the following function:
```
crawler-url-parser.extract(data, sourceUrl)
```

This function is defined as follows:
```
function extract(data, sourceUrl) {
	let urlMap = new Map();
	var baseUrl = parse(sourceUrl);

	let $ = typeof data === "string" ? cheerio.load(data) : data;
	let embedBaseUrlStr = $('base').attr('href');
	let embedBaseUrl = parse(embedBaseUrlStr);
	baseUrl = embedBaseUrl ? embedBaseUrl : baseUrl;
	let baseUrlStr = baseUrl ? baseUrl.url : null;

	$('a').each(function (i, el) {
		let href = $(this).attr('href');
		let text = $(this).text().trim();
		//href = href.replace(/;.*$/g,"");
		if (typeof href == "undefined" || href.length < 3 || /^(javascript|mailto:|ftp:)/ig.test(href)) return;

		let currentUrl = parse(href, baseUrlStr);

		if (currentUrl && currentUrl.url) {
			if (urlMap.has(currentUrl.url)) {
				let tmpUrl = urlMap.get(currentUrl.url);
				if (!tmpUrl.text.includes(text)) {
					tmpUrl.text = `${tmpUrl.text} ${text}`;
				}
			} else {
				currentUrl.text = text == null ? "" : text;
				currentUrl.baseurl = baseUrlStr;
				urlMap.set(currentUrl.url, currentUrl);
			}
		}
	});

	//remove base url
	urlMap.delete(baseUrlStr);

	for (let currentUrl of urlMap.values()) {
		currentUrl.type = gettype(currentUrl, baseUrl);
	}

	let retArr = Array.from(urlMap.values());

	retArr = retArr.map(function (el) {
		return {
			url: el.url,
			text: el.text,
			type: el.type
		}
	});

	return retArr;
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');
describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.extract', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.