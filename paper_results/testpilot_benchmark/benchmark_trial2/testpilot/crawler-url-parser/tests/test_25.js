let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.parse with HTTPS URL', function(done) {
        let result = crawler_url_parser.parse("https://secure.example.com/api/data");
        
        assert.strictEqual(result.url, "https://secure.example.com/api/data");
        assert.strictEqual(result.baseurl, null);
        assert.strictEqual(result.normalized, "https://secure.example.com/api/data");
        assert.strictEqual(result.host, "secure.example.com");
        assert.strictEqual(result.domain, "example.com");
        
        done();
    });
});