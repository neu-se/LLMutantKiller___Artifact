import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with duplicate URLs", () => {
    it("should include duplicate URLs with different text content", () => {
        const html = `
            <html>
                <body>
                    <a href="http://example.com/page1">Unique Text 1</a>
                    <a href="http://example.com/page1">Unique Text 2</a>
                    <a href="http://example.com/page2">Another Link</a>
                </body>
            </html>
        `;
        const baseUrl = "http://example.com";
        const result = extract(html, baseUrl);

        // Should have 2 unique URLs but page1 should appear once with combined text
        expect(result.length).toBe(2);

        const page1Entry = result.find(entry => entry.url === "http://example.com/page1");
        expect(page1Entry).toBeDefined();
        // Original code combines text with space, mutant would not include the second text
        expect(page1Entry.text).toContain("Unique Text 1");
        expect(page1Entry.text).toContain("Unique Text 2");
    });
});