import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with undefined href behavior', () => {
    it('should correctly handle undefined href attribute', () => {
        const html = `
            <html>
                <body>
                    <a>Link without href</a>
                    <a href="valid">Valid link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        // Original: undefined || (length < 3) → true, so skips
        // Mutated: undefined && (length < 3) → false, so doesn't skip (causes error)
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com/valid");
    });
});