// test/extract-filter-test.js

const { extract } = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('extract function should filter out invalid hrefs', () => {
    it('should not include javascript: links in extracted URLs', () => {
        const html = `
            <html>
                <body>
                    <a href="javascript:void(0)">Click me</a>
                    <a href="http://example.com">Valid link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        const hasJavaScriptLink = result.some(url => url.url.includes("javascript:"));
        expect(hasJavaScriptLink).toBe(false);
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com/");
    });
});