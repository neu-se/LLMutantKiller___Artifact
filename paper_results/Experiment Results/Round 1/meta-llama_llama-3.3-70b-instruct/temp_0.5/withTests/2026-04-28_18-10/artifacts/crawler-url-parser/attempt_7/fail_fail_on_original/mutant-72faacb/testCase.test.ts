import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function test', () => {
    it('should pass for valid href and fail for mutated code', () => {
        const html = '<a href="http://www.stackoverflow.com">test-link</a>';
        const baseUrl = 'http://www.stackoverflow.com';
        const result = extract(html, baseUrl);
        expect(result).toBeDefined();
        expect(result).not.toHaveLength(0);
    });
});