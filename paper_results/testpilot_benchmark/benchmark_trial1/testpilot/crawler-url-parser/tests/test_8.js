let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should extract basic links from HTML string', function(done) {
        const htmlData = `
            <html>
                <body>
                    <a href="https://example.com/page1">Page 1</a>
                    <a href="/relative/page2">Page 2</a>
                    <a href="mailto:test@example.com">Email</a>
                    <a href="javascript:void(0)">JS Link</a>
                </body>
            </html>
        `;
        const sourceUrl = 'https://example.com';
        
        const result = crawler_url_parser.extract(htmlData, sourceUrl);
        
        assert(Array.isArray(result));
        assert.equal(result.length, 2); // Should exclude mailto and javascript links
        
        const urls = result.map(item => item.url);
        assert(urls.includes('https://example.com/page1'));
        assert(urls.includes('https://example.com/relative/page2'));
        
        done();
    });

    