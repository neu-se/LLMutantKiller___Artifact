import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should extract urls correctly', () => {
        const html = `
            <html>
                <body>
                    <a href="">test-link-1</a><br />
                    <a href="http://example.com">test-link-2</a><br />
                </body>
            </html>
        `;
        const baseUrl = "http://example.com";
        const result = extract(html, baseUrl);
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com");
    });
});