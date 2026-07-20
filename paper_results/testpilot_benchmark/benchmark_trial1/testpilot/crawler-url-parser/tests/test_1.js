let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should return null for undefined currentUrlStr', function(done) {
        let result = crawler_url_parser.parse(undefined, 'http://example.com');
        assert.strictEqual(result, null);
        done();
    });

    