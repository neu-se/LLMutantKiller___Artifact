Your task is to write a test for the following function:
```
crawler-url-parser.extract(data, sourceUrl)
```

You may use the following examples to guide your implementation:
```
// usage #1
const cup = require('crawler-url-parser');//// extract(html_str,current_url);let htmlStr='<html><body> \    <a href="http://best.question.stackoverflow.com">subdomain</a><br /> \    <a href="http://faq.stackoverflow.com">subdomain</a><br /> \    <a href="http://stackoverflow.com">updomain</a><br /> \    <a href="http://www.google.com">external</a><br /> \    <a href="http://www.facebook.com">external</a><br /> \    <a href="http://question.stackoverflow.com/aaa/bbb/ccc">sublevel</a><br /> \    <a href="http://question.stackoverflow.com/aaa/bbb/zzz">sublevel</a><br /> \    <a href="http://question.stackoverflow.com/aaa/">uplevel</a><br /> \    <a href="http://question.stackoverflow.com/aaa/ddd">samelevel</a><br /> \    <a href="http://question.stackoverflow.com/aaa/eee">samelevel</a><br /> \    <a href="http://question.stackoverflow.com/aaa/ddd/eee">internal</a><br /> \    <a href="http://question.stackoverflow.com/zzz">internal</a><br /> \</body></html>';let currentUrl= "http://question.stackoverflow.com/aaa/bbb";let urls = cup.extract(htmlStr,currentUrl);
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