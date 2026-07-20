import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function test', () => {
    it('should pass for valid href and fail for mutated code', () => {
        const html = '<a href="javascript:void(0)">test-link</a>';
        const baseUrl = 'http://www.stackoverflow.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(0);
    });
});