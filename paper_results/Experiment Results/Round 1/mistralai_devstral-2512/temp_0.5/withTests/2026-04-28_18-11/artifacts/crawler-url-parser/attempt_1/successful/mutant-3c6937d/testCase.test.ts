// testCase.test.ts
import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with href length boundary test', () => {
    it('should process href with exactly 3 characters', () => {
        const html = `
            <html>
                <body>
                    <a href="abc">test-link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://www.stackoverflow.com/aaa/bbb/ccc");
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://www.stackoverflow.com/aaa/bbb/abc");
        expect(result[0].text).toBe("test-link");
    });
});