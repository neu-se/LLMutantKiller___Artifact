import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract', () => {
    it('should extract links correctly', () => {
        const html = `
            <html>
                <body>
                    <a href="">test-link-1</a>
                    <a href="http://www.stackoverflow.com">test-link-2</a>
                </body>
            </html>
        `;
        const baseUrl = "http://www.stackoverflow.com/aaa/bbb/";
        const result = extract(html, baseUrl);
        expect(result.length).toBe(1);
    });
});