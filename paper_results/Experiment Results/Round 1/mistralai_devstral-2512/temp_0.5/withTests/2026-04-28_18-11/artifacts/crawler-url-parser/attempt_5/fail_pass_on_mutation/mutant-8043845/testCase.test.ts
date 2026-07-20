// test/extract-filter-test.js

const { extract } = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('extract function should filter out invalid hrefs', () => {
    it('should filter out javascript: links and include valid links', () => {
        const html = `
            <html>
                <body>
                    <a href="javascript:void(0)">Click me</a>
                    <a href="mailto:test@example.com">Email me</a>
                    <a href="ftp://example.com">FTP link</a>
                    <a href="http://example.com/valid">Valid link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        const validUrls = result.filter((urlObj: any) => urlObj.url);
        expect(validUrls.length).toBeGreaterThan(0);
        expect(validUrls.some((urlObj: any) => urlObj.url.includes("javascript:") || urlObj.url.includes("mailto:") || urlObj.url.includes("ftp:"))).toBe(false);
    });
});