Your task is to write a test for the following function:
```
crawler-url-parser.gettype(linkurl, pageurl)
```

You may use the following examples to guide your implementation:
```
// usage #1
const cup = require('crawler-url-parser');//// gettype(current_url,base_url);let level = cup.gettype("sub.domain.com/aaa/bbb/","sub.domain.com/aaa/bbb/ccc");console.log(level); //sublevellevel = cup.gettype("sub.domain.com/aaa/bbb/ccc/ddd","sub.domain.com/aaa/bbb/ccc");console.log(level); //uplevellevel = cup.gettype("sub.domain.com/aaa/bbb/eee","sub.domain.com/aaa/bbb/ccc");console.log(level); //samelevellevel = cup.gettype("sub.domain.com/aaa/bbb/eee","sub.anotherdomain.com/aaa/bbb/ccc");console.log(level); //external
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