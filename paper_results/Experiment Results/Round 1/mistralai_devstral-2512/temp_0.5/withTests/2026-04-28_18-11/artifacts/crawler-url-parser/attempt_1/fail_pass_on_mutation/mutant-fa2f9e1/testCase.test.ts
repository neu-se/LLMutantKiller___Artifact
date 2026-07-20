// test/extract-text-mutation-test.js

const { extract } = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('extract function text assignment mutation', () => {
    it('should correctly assign link text when text is null', () => {
        const html = `
            <html>
                <body>
                    <a href="http://example.com/page1">Valid Text</a>
                    <a href="http://example.com/page2"></a>
                    <a href="http://example.com/page3">   </a>
                </body>
            </html>
        `;

        const result = extract(html, "http://example.com");
        const linkWithNullText = result.find(link => link.url === "http://example.com/page2");
        const linkWithEmptyText = result.find(link => link.url === "http://example.com/page3");

        expect(linkWithNullText.text).toBe("");
        expect(linkWithEmptyText.text).toBe("");
    });
});