// test/mutant-579d911.test.ts
import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with href validation', () => {
    it('should include hrefs that are exactly 2 characters long and not javascript/mailto/ftp', () => {
        const html = `
            <html>
                <body>
                    <a href="ab">valid short link</a>
                    <a href="http://example.com/other">other link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        expect(result.length).toBe(2);
        expect(result[0].url).toBe("http://example.com/ab");
        expect(result[0].text).toBe("valid short link");
        expect(result[1].url).toBe("http://example.com/other");
        expect(result[1].text).toBe("other link");
    });
});