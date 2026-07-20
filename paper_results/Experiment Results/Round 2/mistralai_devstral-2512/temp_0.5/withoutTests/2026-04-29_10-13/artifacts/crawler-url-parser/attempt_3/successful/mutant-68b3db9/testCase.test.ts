import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function text trimming", () => {
    it("should trim whitespace from anchor text", () => {
        const html = `
            <html>
                <head>
                    <base href="https://example.com/base/">
                </head>
                <body>
                    <a href="page.html">  Test Link With Spaces  </a>
                </body>
            </html>
        `;
        const sourceUrl = "https://example.com";
        const result = extract(html, sourceUrl);
        expect(result).toHaveLength(1);
        expect(result[0].text).toBe("Test Link With Spaces");
        expect(result[0].text).not.toMatch(/^\s|\s$/);
    });
});