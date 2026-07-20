Your task is to write a test for the following function:
```
crawler-url-parser.parse(currentUrlStr, baseUrlStr)
```

You may use the following examples to guide your implementation:
```
// usage #1
const cup = require('crawler-url-parser');//// parse(current_url[,base_url])let result = cup.parse("http://question.stackoverflow.com/aaa/bbb/ddd?q1=query1&q2=query2");console.log(result.url);// http://question.stackoverflow.com/aaa/bbb/ddd?q1=query1&q2=query2console.log(result.baseurl);// nullconsole.log(result.normalized);// http://question.stackoverflow.com/aaa/bbb/ddd?q1=query1&q2=query2console.log(result.host); // question.stackoverflow.comconsole.log(result.domain); // stackoverflow.com
// usage #2
const cup = require('crawler-url-parser');//// parse(current_url[,base_url])let result = cup.parse("../ddd?q1=query1&q2=query2","http://question.stackoverflow.com/aaa/bbb/ccc/");console.log(result.url);// http://question.stackoverflow.com/aaa/bbb/ddd?q1=query1&q2=query2console.log(result.baseurl);// http://question.stackoverflow.com/aaa/bbb/cccconsole.log(result.normalized);// http://question.stackoverflow.com/aaa/bbb/ddd?q1=query1&q2=query2console.log(result.host); // question.stackoverflow.comconsole.log(result.domain); // stackoverflow.com
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