import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function test', () => {
    it('should pass when run against the original code and fail when run against the mutated code', () => {
        const htmlString = '<html><body><a href="http://www.stackoverflow.com">test-link</a></body></html>';
        const baseUrl = 'http://www.stackoverflow.com';
        const result = extract(htmlString, baseUrl);
        if (result.length > 0) {
            expect(result[0].text).not.toBe('');
        } else {
            expect(result.length).toBe(1);
        }
    });
});