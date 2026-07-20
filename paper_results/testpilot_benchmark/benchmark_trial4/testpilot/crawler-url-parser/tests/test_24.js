let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.parse with root relative path', function(done) {
        let result = crawler_url_parser.parse("/absolute/path", "http://test.example.org/some/deep/path/");
        
        assert.strictEqual(result.baseurl, "http://test.example.org/some/deep/path/");
        assert.strictEqual(result.host, "test.example.org");
        assert.strictEqual(result.domain, "example.org");
        
        done();
    });
});