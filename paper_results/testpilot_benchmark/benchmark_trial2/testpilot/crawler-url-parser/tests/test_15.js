let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should count query parameters correctly', function(done) {
        let result = crawler_url_parser.parse('http://example.com?param1=value1&param2=value2&param3=value3', null);
        assert.strictEqual(result.querycount, 3);
        assert.strictEqual(result.search, '?param1=value1&param2=value2&param3=value3');
        done();
    });

    