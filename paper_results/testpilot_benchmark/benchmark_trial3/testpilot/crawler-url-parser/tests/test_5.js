let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should extract absolute URLs from HTML content', function(done) {
        const htmlData = '<html><body><a href="https://example.com/page1">Link 1</a><a href="https://example.com/page2">Link 2</a></body></html>';
        const sourceUrl = 'https://example.com';
        
        const result = crawler_url_parser.extract(htmlData, sourceUrl);
        
        assert(Array.isArray(result), 'Result should be an array');
        assert(result.includes('https://example.com/page1'), 'Should contain first absolute URL');
        assert(result.includes('https://example.com/page2'), 'Should contain second absolute URL');
        done();
    });

    