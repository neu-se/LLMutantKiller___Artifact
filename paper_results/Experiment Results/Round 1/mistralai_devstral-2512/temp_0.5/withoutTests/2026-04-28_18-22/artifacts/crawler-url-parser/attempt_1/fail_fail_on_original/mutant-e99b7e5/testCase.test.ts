import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
    it("should handle null text correctly when extracting URLs", () => {
        const html = `
            <html>
                <head></head>
                <body>
                    <a href="https://example.com/page1">Link Text</a>
                    <a href="https://example.com/page2"></a>
                </body>
            </html>
        `;
        const sourceUrl = "https://example.com";
        const result = extract(html, sourceUrl);
        expect(result).toContainEqual({
            url: "https://example.com/page2",
            text: "",
            type: "internal"
        });
    });
});