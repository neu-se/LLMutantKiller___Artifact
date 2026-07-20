let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.extract with basic HTML', function(done) {
        let htmlStr = '<html><body>' +
            '<a href="http://example.com/page1">link1</a>' +
            '<a href="http://example.com/page2">link2</a>' +
            '<a href="http://other.com/page">external</a>' +
            '</body></html>';
        let currentUrl = "http://example.com/current";
        
        let urls = crawler_url_parser.extract(htmlStr, currentUrl);
        
        assert(Array.isArray(urls), 'Should return an array');
        assert(urls.length > 0, 'Should extract some URLs');
        done();
    });

    })