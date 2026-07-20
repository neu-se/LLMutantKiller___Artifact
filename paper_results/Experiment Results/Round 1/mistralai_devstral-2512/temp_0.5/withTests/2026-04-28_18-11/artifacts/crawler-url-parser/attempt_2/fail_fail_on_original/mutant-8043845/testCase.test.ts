// test/extract-filter-test.js

const { extract } = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('extract function should filter out invalid hrefs', () => {
    it('should not include javascript: links in extracted URLs', () => {
        const html = `
            <html>
                <body>
                    <a href="javascript:void(0)">Click me</a>
                    <a href="mailto:test@example.com">Email me</a>
                    <a href="ftp://example.com">FTP link</a>
                    <a href="http://example.com">Valid link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        const validUrls = result.filter((urlObj: any) => urlObj.url);
        expect(validUrls.length).toBe(1);
        expect(validUrls[0].url).toBe("http://example.com/");
    });
});