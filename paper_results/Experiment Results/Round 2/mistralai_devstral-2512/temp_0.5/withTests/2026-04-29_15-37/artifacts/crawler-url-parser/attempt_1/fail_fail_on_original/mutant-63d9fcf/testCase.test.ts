import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with duplicate URLs and different text", () => {
    it("should include URLs with different text content", () => {
        const html = `
            <html>
                <body>
                    <a href="http://example.com/page1">First Link</a>
                    <a href="http://example.com/page1">Second Link</a>
                    <a href="http://example.com/page2">Third Link</a>
                </body>
            </html>
        `;
        const baseUrl = "http://example.com";
        const result = extract(html, baseUrl);

        // Should have 2 entries (page1 with different text, and page2)
        expect(result.length).toBe(2);

        // Find the entry for page1
        const page1Entries = result.filter(entry => entry.url === "http://example.com/page1");
        expect(page1Entries.length).toBe(1);

        // The text should be "First Link" (the first occurrence)
        expect(page1Entries[0].text).toBe("First Link");
    });
});