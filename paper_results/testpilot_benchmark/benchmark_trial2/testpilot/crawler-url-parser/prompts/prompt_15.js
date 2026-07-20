The test:
```
let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.gettype with relative path without leading slash', function(done) {
        let linkurl = 'subfolder/page.html';
        let pageurl = 'https://example.com/current.html';
        let result = crawler_url_parser.gettype(linkurl, pageurl);
        assert.strictEqual(result, 'relative');
        done();
    });
});
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ 'external'
- 'relative'  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.