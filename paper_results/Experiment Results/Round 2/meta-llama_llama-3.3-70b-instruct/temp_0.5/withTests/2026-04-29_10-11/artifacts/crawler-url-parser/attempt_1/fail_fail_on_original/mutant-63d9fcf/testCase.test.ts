import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should return different results for original and mutated code', () => {
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
        const originalResult = extract(htmlString, baseUrl);
        const mutatedResult = extract(htmlString, baseUrl);
        expect(originalResult.length).toBe(2);
        expect(mutatedResult.length).toBe(3);
    });
});