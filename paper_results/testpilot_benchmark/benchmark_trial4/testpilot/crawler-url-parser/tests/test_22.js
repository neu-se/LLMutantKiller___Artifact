let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.parse with simple relative path', function(done) {
        let result = crawler_url_parser.parse("page.html", "http://example.com/folder/");
        
        assert.strictEqual(result.baseurl, "http://example.com/folder/");
        assert.strictEqual(result.host, "example.com");
        assert.strictEqual(result.domain, "example.com");
        
        done();
    });

    