import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with href attribute', () => {
    it('should process href with exactly 2 characters', () => {
        const html = `
            <html>
                <body>
                    <a href="ab">Short link</a>
                </body>
            </html>
        `;
        const baseUrl = "http://example.com";
        const result = extract(html, baseUrl);

        // Both original and mutated code should process this since length < 3 is false
        // But we need to verify the actual behavior
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com/ab");
    });
});