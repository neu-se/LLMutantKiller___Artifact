import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with empty string href', () => {
    it('should not filter out empty string href attributes', () => {
        const html = `
            <html>
                <body>
                    <a href="">Empty href link</a>
                </body>
            </html>
        `;
        const baseUrl = "http://example.com";
        const result = extract(html, baseUrl);

        // The original code checks typeof href == "undefined" which is false for empty string
        // The mutated code checks typeof href == "" which is true for empty string
        // So the original code will process empty string hrefs, while mutated code will skip them
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com/");
    });
});