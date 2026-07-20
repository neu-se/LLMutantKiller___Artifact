// test/duplicate-text-concatenation.test.ts
import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function duplicate URL text handling', () => {
    it('should concatenate text for duplicate URLs when text is not already included', () => {
        const html = `
            <html>
                <body>
                    <a href="http://example.com/page1">First Link</a>
                    <a href="http://example.com/page1">Second Link</a>
                </body>
            </html>
        `;
        const baseUrl = "http://example.com";
        const result = extract(html, baseUrl);

        // Find the entry for the duplicate URL
        const duplicateEntry = result.find(entry => entry.url === "http://example.com/page1");
        expect(duplicateEntry).toBeDefined();
        expect(duplicateEntry?.text).toBe("First Link Second Link");
    });
});