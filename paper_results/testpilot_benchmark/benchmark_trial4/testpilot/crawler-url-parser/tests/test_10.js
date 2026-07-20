let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should parse relative URL with baseUrl', function(done) {
        let result = crawler_url_parser.parse('/relative/path', 'https://example.com/base');
        assert.strictEqual(result.url, 'https://example.com/relative/path');
        assert.strictEqual(result.baseurl, 'https://example.com/base');
        assert.strictEqual(result.protocol, 'https:');
        assert.strictEqual(result.host, 'example.com');
        assert.strictEqual(result.domain, 'example.com');
        assert.strictEqual(result.subdomain, null);
        assert.strictEqual(result.path, '/relative/path');
        done();
    });

    