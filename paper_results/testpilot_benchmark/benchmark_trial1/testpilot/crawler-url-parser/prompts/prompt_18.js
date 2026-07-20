The test:
```
let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.gettype with mailto link', function(done) {
        let linkurl = 'mailto:test@example.com';
        let pageurl = 'https://example.com/page.html';
        let result = crawler_url_parser.gettype(linkurl, pageurl);
        assert.strictEqual(result, 'mailto');
        done();
    });

    })
``` 
failed with the following error message:
```
Cannot read properties of null (reading 'subdomain')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.