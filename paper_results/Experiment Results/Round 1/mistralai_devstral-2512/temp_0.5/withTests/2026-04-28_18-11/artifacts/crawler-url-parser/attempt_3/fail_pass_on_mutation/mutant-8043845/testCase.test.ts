// test/extract-filter-test.js

const { extract } = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('extract function should filter out invalid hrefs', () => {
    it('should filter out javascript: links and include valid links', () => {
        const html = `
            <html>
                <body>
                    <a href="javascript:void(0)">Click me</a>
                    <a href="http://example.com/valid">Valid link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        const hasValidLink = result.some((urlObj: any) => urlObj.url === "http://example.com/valid");
        const hasJavaScriptLink = result.some((urlObj: any) => urlObj.url && urlObj.url.includes("javascript:"));
        expect(hasValidLink).toBe(true);
        expect(hasJavaScriptLink).toBe(false);
    });
});