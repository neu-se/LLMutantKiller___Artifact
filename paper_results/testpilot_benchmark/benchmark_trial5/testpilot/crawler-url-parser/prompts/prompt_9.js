The test:
```
let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should resolve relative URLs against source URL', function(done) {
        const htmlData = '<html><body><a href="/relative-path">Relative Link</a><a href="another-page.html">Another Link</a></body></html>';
        const sourceUrl = 'https://example.com/current-page';
        
        const result = crawler_url_parser.extract(htmlData, sourceUrl);
        
        assert(Array.isArray(result), 'Result should be an array');
        assert(result.some(url => url.includes('/relative-path')), 'Should resolve relative path');
        assert(result.some(url => url.includes('another-page.html')), 'Should resolve relative file');
        done();
    });

    })
``` 
failed with the following error message:
```
url.includes is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.