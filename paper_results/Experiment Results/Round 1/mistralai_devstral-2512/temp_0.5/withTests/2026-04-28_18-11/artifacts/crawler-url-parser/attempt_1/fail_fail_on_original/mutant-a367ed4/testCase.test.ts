import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with short href', () => {
    it('should skip hrefs shorter than 3 characters', () => {
        const html = `
            <html>
                <body>
                    <a href="ab">short link</a>
                    <a href="http://example.com">normal link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com/");
    });
});