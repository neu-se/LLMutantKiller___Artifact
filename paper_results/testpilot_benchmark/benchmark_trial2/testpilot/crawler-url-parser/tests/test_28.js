let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should handle empty HTML data', function(done) {
        const htmlData = '';
        const sourceUrl = 'https://example.com';
        
        const result = crawler_url_parser.extract(htmlData, sourceUrl);
        
        assert(Array.isArray(result), 'Result should be an array');
        assert.equal(result.length, 0, 'Should return empty array for empty data');
        done();
    });

    })