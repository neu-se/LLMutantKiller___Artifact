import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with href exactly 3 characters long', () => {
    it('should process hrefs that are exactly 3 characters long', () => {
        const html = `
            <html>
                <body>
                    <a href="abc">three char link</a>
                    <a href="http://example.com">normal link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        expect(result.length).toBe(2);
        expect(result[0].url).toBe("http://example.com/abc");
        expect(result[1].url).toBe("http://example.com/");
    });
});