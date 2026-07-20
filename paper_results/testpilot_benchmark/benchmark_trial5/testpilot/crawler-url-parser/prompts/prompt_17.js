The test:
```
let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.gettype with query parameter URL', function(done) {
        let linkurl = '?param=value';
        let pageurl = 'https://example.com/page.html';
        let result = crawler_url_parser.gettype(linkurl, pageurl);
        assert.strictEqual(result, 'query');
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ 'external'
- 'query'  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.