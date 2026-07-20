// test/duplicate-text-concatenation.test.ts
import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function duplicate text handling', () => {
    it('should not concatenate text when the same text already exists', () => {
        const html = `
            <html>
                <body>
                    <a href="http://example.com/page1">Test Link</a>
                    <a href="http://example.com/page1">Test Link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        const page1Link = result.find(link => link.url === "http://example.com/page1");
        expect(page1Link?.text).toBe("Test Link");
    });
});