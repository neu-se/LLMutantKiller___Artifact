let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should handle relative paths with baseUrl', function(done) {
        let result = crawler_url_parser.parse('../parent/path', 'https://example.com/current/page');
        assert.strictEqual(result.url, 'https://example.com/parent/path');
        assert.strictEqual(result.baseurl, 'https://example.com/current/page');
        assert.strictEqual(result.protocol, 'https:');
        assert.strictEqual(result.host, 'example.com');
        done();
    });

    