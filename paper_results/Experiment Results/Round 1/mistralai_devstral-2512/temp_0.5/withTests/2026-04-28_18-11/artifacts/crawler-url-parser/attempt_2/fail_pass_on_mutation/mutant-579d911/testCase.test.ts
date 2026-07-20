// test/mutant-579d911.test.ts
import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with javascript href', () => {
    it('should skip javascript hrefs', () => {
        const html = `
            <html>
                <body>
                    <a href="javascript:void(0)">javascript link</a>
                    <a href="http://example.com/valid">valid link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com/valid");
        expect(result[0].text).toBe("valid link");
    });
});