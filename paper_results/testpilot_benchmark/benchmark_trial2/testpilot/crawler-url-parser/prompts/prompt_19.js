The test:
```
let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.gettype with protocol-relative URL', function(done) {
        let linkurl = '//example.com/page.html';
        let pageurl = 'https://test.com/current.html';
        let result = crawler_url_parser.gettype(linkurl, pageurl);
        assert.strictEqual(result, 'protocol-relative');
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ 'external'
- 'protocol-relative'  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.