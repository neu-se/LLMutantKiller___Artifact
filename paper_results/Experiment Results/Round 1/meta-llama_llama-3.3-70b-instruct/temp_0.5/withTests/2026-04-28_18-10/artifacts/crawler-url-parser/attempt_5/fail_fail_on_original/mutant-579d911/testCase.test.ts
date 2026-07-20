import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should extract urls correctly', () => {
        const html = `
            <html>
                <body>
                    <a href="http://example.com">test-link-1</a><br />
                    <a href="http://example.com">test-link-2</a><br />
                    <a href="javascript:void(0)">test-link-3</a><br />
                    <a href="mailto:test@example.com">test-link-4</a><br />
                    <a href="ftp://example.com">test-link-5</a><br />
                </body>
            </html>
        `;
        const baseUrl = "http://example.com";
        const result = extract(html, baseUrl);
        expect(result.length).toBe(2);
        expect(result[0].url).toBe("http://example.com");
        expect(result[1].url).toBe("http://example.com");
    });
});