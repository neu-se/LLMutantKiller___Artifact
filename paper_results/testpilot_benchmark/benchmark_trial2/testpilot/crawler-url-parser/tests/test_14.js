let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should resolve relative URLs with "../" notation', function(done) {
        let result = crawler_url_parser.parse('../other/path', 'http://example.com/base/current/');
        assert.strictEqual(result.url, 'http://example.com/base/other/path');
        assert.strictEqual(result.baseurl, 'http://example.com/base/current/');
        done();
    });

    