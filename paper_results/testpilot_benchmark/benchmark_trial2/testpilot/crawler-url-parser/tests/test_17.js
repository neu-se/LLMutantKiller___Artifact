let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should handle URLs without subdomains', function(done) {
        let result = crawler_url_parser.parse('http://example.com/path', null);
        assert.strictEqual(result.domain, 'example.com');
        assert.strictEqual(result.subdomain, null);
        done();
    });

    