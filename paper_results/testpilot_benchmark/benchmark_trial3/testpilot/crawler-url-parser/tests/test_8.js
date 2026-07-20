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
                    <a href="#anchor">Anchor Link</a>
                </body>
            </html>
        `;
        const sourceUrl = 'https://example.com';
        
        const result = crawler_url_parser.extract(htmlData, sourceUrl);
        
        assert(Array.isArray(result), 'Result should be an array');
        assert(result.length > 0, 'Should extract at least one link');
        
        const absoluteLink = result.find(link => link.url === 'https://example.com/page1');
        assert(absoluteLink, 'Should extract absolute link');
        assert.equal(absoluteLink.text, 'Page 1', 'Should extract link text');
        
        done();
    });

    