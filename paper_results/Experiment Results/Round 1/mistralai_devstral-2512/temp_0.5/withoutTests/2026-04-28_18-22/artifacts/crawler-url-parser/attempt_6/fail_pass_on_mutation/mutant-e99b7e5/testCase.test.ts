import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
    it("should maintain empty string for null anchor text", () => {
        const html = `
            <html>
                <head></head>
                <body>
                    <a href="https://example.com/target"></a>
                </body>
            </html>
        `;
        const sourceUrl = "https://example.com";
        const result = extract(html, sourceUrl);
        expect(result[0].text).toStrictEqual("");
    });
});