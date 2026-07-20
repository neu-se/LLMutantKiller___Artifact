// test/mutant-579d911.test.ts
import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with short href', () => {
    it('should not skip short hrefs that are not javascript/mailto/ftp', () => {
        const html = `
            <html>
                <body>
                    <a href="ab">short link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com/ab");
        expect(result[0].text).toBe("short link");
    });
});