// test/mutant-579d911.test.ts
import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with href length check', () => {
    it('should include hrefs with exactly 3 characters that are not javascript/mailto/ftp', () => {
        const html = `
            <html>
                <body>
                    <a href="abc">valid link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com/abc");
        expect(result[0].text).toBe("valid link");
    });
});