// test/extract-text-content.test.ts

import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function text content handling', () => {
    it('should correctly assign link text content to extracted URLs', () => {
        const html = `
            <html>
                <body>
                    <a href="http://example.com/page1">Link Text 1</a>
                    <a href="http://example.com/page2">Link Text 2</a>
                    <a href="http://example.com/page3"></a>
                </body>
            </html>
        `;
        const baseUrl = "http://example.com";
        const result = extract(html, baseUrl);

        // Find the entries for our test URLs
        const page1 = result.find(entry => entry.url === "http://example.com/page1");
        const page2 = result.find(entry => entry.url === "http://example.com/page2");
        const page3 = result.find(entry => entry.url === "http://example.com/page3");

        // Verify text content is correctly assigned
        expect(page1).toBeDefined();
        expect(page1!.text).toBe("Link Text 1");

        expect(page2).toBeDefined();
        expect(page2!.text).toBe("Link Text 2");

        expect(page3).toBeDefined();
        expect(page3!.text).toBe("");
    });
});