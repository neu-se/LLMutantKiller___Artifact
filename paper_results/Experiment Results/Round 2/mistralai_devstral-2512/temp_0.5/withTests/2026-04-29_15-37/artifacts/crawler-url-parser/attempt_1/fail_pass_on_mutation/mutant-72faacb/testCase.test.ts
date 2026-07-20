import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with empty string href', () => {
    it('should handle empty string href attributes correctly', () => {
        const html = `
            <html>
                <body>
                    <a href="">Empty href link</a>
                    <a href="valid">Valid link</a>
                </body>
            </html>
        `;
        const baseUrl = "http://example.com";
        const result = extract(html, baseUrl);

        // The mutated code will incorrectly filter out the empty string href,
        // while the original code will process it (though it may not produce a valid URL)
        // We expect the result to contain at least the valid link
        expect(result.length).toBeGreaterThan(0);

        // Check that we have the valid link in results
        const validLink = result.find(r => r.url.includes("valid"));
        expect(validLink).toBeDefined();
        expect(validLink?.url).toBe("http://example.com/valid");
    });
});