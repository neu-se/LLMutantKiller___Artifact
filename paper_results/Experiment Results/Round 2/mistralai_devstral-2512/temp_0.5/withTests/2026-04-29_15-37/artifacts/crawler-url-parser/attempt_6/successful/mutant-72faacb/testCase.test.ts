import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with undefined href', () => {
    it('should handle undefined href attributes correctly', () => {
        const html = `
            <html>
                <body>
                    <a>Link without href</a>
                    <a href="valid">Valid link</a>
                </body>
            </html>
        `;
        const baseUrl = "http://example.com";
        const result = extract(html, baseUrl);

        // The original code checks typeof href == "undefined" which is true for missing href
        // The mutated code checks typeof href == "" which is false for missing href
        // So original code will skip it, mutated code will try to process it
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com/valid");
    });
});