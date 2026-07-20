let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should handle URLs with fragments by removing them', function(done) {
        let result = crawler_url_parser.parse('https://example.com/path#fragment', null);
        assert.strictEqual(result.url, 'https://example.com/path');
        assert.strictEqual(result.protocol, 'https:');
        assert.strictEqual(result.host, 'example.com');
        assert.strictEqual(result.path, '/path');
        done();
    });

    