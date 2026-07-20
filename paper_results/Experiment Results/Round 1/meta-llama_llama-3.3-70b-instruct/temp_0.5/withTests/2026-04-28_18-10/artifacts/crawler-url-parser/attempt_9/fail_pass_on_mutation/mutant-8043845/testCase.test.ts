import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function test', () => {
    it('should extract urls from html', () => {
        const html = `
            <html>
                <body>
                    <a href="ftp://www.stackoverflow.com/aaa/bbb/ccc">test-link-1</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://www.stackoverflow.com/aaa/bbb/ccc");
        expect(result.length).toBe(0);
    });
});