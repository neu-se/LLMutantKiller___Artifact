let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should return null for non-http/https protocols', function(done) {
        let result = crawler_url_parser.parse('ftp://example.com/file', null);
        assert.strictEqual(result, null);
        done();
    });

    