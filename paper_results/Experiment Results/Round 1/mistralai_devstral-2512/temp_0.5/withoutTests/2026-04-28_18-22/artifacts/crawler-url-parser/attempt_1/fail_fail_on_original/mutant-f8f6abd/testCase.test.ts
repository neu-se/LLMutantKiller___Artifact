import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
    it("should handle undefined href attributes correctly", () => {
        const html = `
            <html>
                <head></head>
                <body>
                    <a href="undefined">Link with undefined href</a>
                </body>
            </html>
        `;
        const sourceUrl = "http://example.com";
        const result = extract(html, sourceUrl);
        expect(result).toEqual([]);
    });
});