import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should return different results for the same url with different texts when the original code is used', () => {
        const htmlString = '<a href="http://www.stackoverflow.com/internal-1">test-link-1</a><br /><a href="http://www.stackoverflow.com/internal-1">test-link-2</a>';
        const baseUrl = 'http://www.stackoverflow.com/aaa/bbb/ccc';
        const result = extract(htmlString, baseUrl);
        const expected = [
            {
                url: 'http://www.stackoverflow.com/internal-1',
                text: 'test-link-1 test-link-2',
                type: 'internal'
            }
        ];
        // The test should fail on the mutated code because it will return 
        // two separate objects for the same url instead of one.
        expect(result.length).toBe(1);
    });
});