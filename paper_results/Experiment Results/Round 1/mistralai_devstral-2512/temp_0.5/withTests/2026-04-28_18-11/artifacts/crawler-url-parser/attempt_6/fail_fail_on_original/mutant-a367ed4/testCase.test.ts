import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with href containing only spaces', () => {
    it('should skip hrefs containing only spaces', () => {
        const html = `
            <html>
                <body>
                    <a href="   ">spaces only</a>
                    <a href="http://example.com">normal link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com/");
    });
});