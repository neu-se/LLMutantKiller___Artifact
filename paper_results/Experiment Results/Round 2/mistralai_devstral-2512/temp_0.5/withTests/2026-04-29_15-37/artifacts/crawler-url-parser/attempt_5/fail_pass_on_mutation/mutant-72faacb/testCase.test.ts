import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with javascript href', () => {
    it('should filter out javascript: href attributes', () => {
        const html = `
            <html>
                <body>
                    <a href="javascript:void(0)">JS link</a>
                    <a href="valid">Valid link</a>
                </body>
            </html>
        `;
        const baseUrl = "http://example.com";
        const result = extract(html, baseUrl);

        // Both original and mutated code should filter out javascript: links
        // We should only get the valid link
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com/valid");
    });
});