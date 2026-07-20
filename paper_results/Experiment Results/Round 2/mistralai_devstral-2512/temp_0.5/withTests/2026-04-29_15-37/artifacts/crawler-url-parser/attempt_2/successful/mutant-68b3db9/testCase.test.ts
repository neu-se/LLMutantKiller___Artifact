import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with whitespace in link text', () => {
    it('should handle links with whitespace in text content', () => {
        const html = `
            <html>
                <body>
                    <a href="http://example.com/path">   Link Text   </a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        const link = result.find(r => r.url === "http://example.com/path");
        expect(link).toBeDefined();
        expect(link?.text).toBe("Link Text");
    });
});