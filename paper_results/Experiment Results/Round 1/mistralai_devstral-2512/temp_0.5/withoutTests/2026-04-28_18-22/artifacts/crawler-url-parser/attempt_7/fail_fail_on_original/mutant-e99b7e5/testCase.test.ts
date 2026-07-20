import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
    it("should return empty string for anchor elements with no text content", () => {
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
        expect(result).toEqual([
            {
                url: "https://example.com/target",
                text: "",
                type: "internal"
            }
        ]);
    });
});