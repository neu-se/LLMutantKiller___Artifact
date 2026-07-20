let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should resolve relative URLs with base URL', function(done) {
        let result = crawler_url_parser.parse('/relative/path', 'http://example.com/base/');
        assert.strictEqual(result.url, 'http://example.com/relative/path');
        assert.strictEqual(result.baseurl, 'http://example.com/base/');
        assert.strictEqual(result.host, 'example.com');
        assert.strictEqual(result.path, '/relative/path');
        done();
    });

    