let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should add http:// prefix to URLs without protocol', function(done) {
        let result = crawler_url_parser.parse('example.com/path', null);
        assert.strictEqual(result.url, 'http://example.com/path');
        assert.strictEqual(result.protocol, 'http:');
        done();
    });
});