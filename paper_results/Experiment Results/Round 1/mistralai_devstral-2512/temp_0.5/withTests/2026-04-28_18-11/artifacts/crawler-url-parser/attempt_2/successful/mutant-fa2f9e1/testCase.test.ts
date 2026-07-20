// test/extract-text-mutation-test.js

const { extract } = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('extract function text assignment mutation', () => {
    it('should correctly handle link text assignment when text is not null', () => {
        const html = `
            <html>
                <body>
                    <a href="http://example.com/page1">Link Text</a>
                </body>
            </html>
        `;

        const result = extract(html, "http://example.com");
        const link = result.find(link => link.url === "http://example.com/page1");

        expect(link.text).toBe("Link Text");
    });
});