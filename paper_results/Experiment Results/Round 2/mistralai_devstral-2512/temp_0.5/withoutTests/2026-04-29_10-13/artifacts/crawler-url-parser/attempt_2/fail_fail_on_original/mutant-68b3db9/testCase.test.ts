import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
    it("should handle link text with surrounding whitespace correctly", () => {
        const html = `
            <html>
                <body>
                    <a href="https://example.com">  Test Link  </a>
                </body>
            </html>
        `;
        const sourceUrl = "https://example.com";
        const result = extract(html, sourceUrl);
        expect(result[0].text).toBe("Test Link");
        expect(result[0].text).not.toMatch(/^\s|\s$/);
    });
});