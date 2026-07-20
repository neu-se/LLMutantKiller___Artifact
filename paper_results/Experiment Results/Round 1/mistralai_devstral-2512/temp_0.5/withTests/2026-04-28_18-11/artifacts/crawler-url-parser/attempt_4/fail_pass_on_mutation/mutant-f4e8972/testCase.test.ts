import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with valid HTML string", () => {
    it("should correctly extract links from valid HTML string", () => {
        const htmlString = `
            <html>
                <head>
                    <base href="http://example.com/base/" />
                </head>
                <body>
                    <a href="/test">Test Link</a>
                </body>
            </html>
        `;
        const result = extract(htmlString, "http://example.com");
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].url).toBe("http://example.com/test");
        expect(result[0].text).toBe("Test Link");
    });
});