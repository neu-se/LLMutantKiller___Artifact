// test/mutant-497dce4.test.ts

import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with duplicate URLs', () => {
    it('should merge text from duplicate URLs', () => {
        const html = `
            <html>
                <body>
                    <a href="http://example.com/page1">First Link</a>
                    <a href="http://example.com/page1">Second Link</a>
                </body>
            </html>
        `;

        const result = extract(html, "http://example.com");

        // Should have only one entry for the duplicate URL
        expect(result.length).toBe(1);

        // The text should be merged
        const entry = result[0];
        expect(entry.url).toBe("http://example.com/page1");
        expect(entry.text).toBe("First Link Second Link");
    });
});