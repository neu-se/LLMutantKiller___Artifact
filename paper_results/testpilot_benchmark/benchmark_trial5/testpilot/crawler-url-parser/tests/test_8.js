let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should extract basic links from HTML string', function(done) {
        const htmlData = `
            <html>
                <body>
                    <a href="https://example.com/page1">Page 1</a>
                    <a href="/relative/path">Relative Link</a>
                    <a href="mailto:test@example.com">Email</a>
                    <a href="javascript:void(0)">JS Link</a>
                </body>
            </html>
        `;
        const sourceUrl = 'https://example.com';
        
        const result = crawler_url_parser.extract(htmlData, sourceUrl);
        
        assert(Array.isArray(result), 'Result should be an array');
        assert(result.length >= 2, 'Should extract at least 2 valid links');
        
        // Check that mailto and javascript links are filtered out
        const urls = result.map(item => item.url);
        assert(!urls.some(url => url.includes('mailto:')), 'Should filter out mailto links');
        assert(!urls.some(url => url.includes('javascript:')), 'Should filter out javascript links');
        
        done();
    });

    })