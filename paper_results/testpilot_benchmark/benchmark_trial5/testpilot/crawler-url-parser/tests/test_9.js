let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.extract with basic HTML', function(done) {
        let htmlStr = '<html><body>' +
            '<a href="http://example.com/page1">Page 1</a>' +
            '<a href="http://example.com/page2">Page 2</a>' +
            '<a href="http://external.com">External</a>' +
            '</body></html>';
        let currentUrl = "http://example.com/current";
        
        let urls = crawler_url_parser.extract(htmlStr, currentUrl);
        
        assert(Array.isArray(urls), 'Should return an array');
        assert(urls.length > 0, 'Should extract some URLs');
        
        // Check that each result has required properties
        urls.forEach(url => {
            assert(typeof url.url === 'string', 'Should have url property');
            assert(typeof url.text === 'string', 'Should have text property');
            assert(typeof url.type === 'string', 'Should have type property');
        });
        
        done();
    });

    })