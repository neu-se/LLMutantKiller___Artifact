import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
    it("should skip links with undefined href attributes", () => {
        const html = `
            <html>
                <head></head>
                <body>
                    <a>Link without href</a>
                    <a href="http://example.com/valid">Valid link</a>
                </body>
            </html>
        `;
        const sourceUrl = "http://example.com";
        const result = extract(html, sourceUrl);
        expect(result).toHaveLength(1);
        expect(result[0].url).toBe("http://example.com/valid");
    });
});