import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should return different results for the same url with different texts when the original code is used', () => {
        const htmlString = '<a href="http://www.stackoverflow.com/internal-1">test-link-1</a><br /><a href="http://www.stackoverflow.com/internal-1">same text</a>';
        const baseUrl = 'http://www.stackoverflow.com/aaa/bbb/ccc';
        const result = extract(htmlString, baseUrl);
        const expectedText = 'test-link-1 same text';
        // The test should pass on the original code because it appends the text 
        // of the same url only if the text is different. The test should fail 
        // on the mutated code because it will always append the text of the same url.
        expect(result[0].text).toBe('test-link-1');
    });
});