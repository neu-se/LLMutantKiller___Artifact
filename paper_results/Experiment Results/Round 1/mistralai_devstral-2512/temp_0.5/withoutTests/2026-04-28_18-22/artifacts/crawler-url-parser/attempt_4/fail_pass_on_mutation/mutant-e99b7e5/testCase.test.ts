import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
    it("should assign empty string to text when anchor has no text content", () => {
        const html = `
            <html>
                <head></head>
                <body>
                    <a href="https://example.com/page1"></a>
                </body>
            </html>
        `;
        const sourceUrl = "https://example.com";
        const result = extract(html, sourceUrl);
        expect(result[0].text).toBe("");
    });
});