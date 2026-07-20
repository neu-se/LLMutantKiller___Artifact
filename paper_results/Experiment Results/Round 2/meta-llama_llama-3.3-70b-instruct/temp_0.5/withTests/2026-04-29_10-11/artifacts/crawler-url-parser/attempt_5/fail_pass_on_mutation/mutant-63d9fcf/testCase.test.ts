import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should return correct results for original code', () => {
        const htmlString = `
            <html>
                <body>
                    <a href="http://www.stackoverflow.com/internal-1">test-link-1</a>
                    <a href="http://www.stackoverflow.com/internal-2">test-link-2</a>
                    <a href="http://www.stackoverflow.com/internal-2">test-link-3</a>
                </body>
            </html>
        `;
        const baseUrl = "http://www.stackoverflow.com/aaa/bbb/ccc";
        const result = extract(htmlString, baseUrl);
        const uniqueTextValues = new Set(result.map((el) => el.text));
        expect(uniqueTextValues.size).toBe(2);
    });
});