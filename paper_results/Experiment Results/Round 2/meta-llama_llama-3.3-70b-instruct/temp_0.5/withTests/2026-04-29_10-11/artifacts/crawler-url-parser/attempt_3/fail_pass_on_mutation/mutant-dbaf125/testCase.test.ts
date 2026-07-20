import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should return different results for the same url with different texts when the original code is used', () => {
        const htmlString = '<a href="http://www.stackoverflow.com/internal-1">test-link-1</a><br /><a href="http://www.stackoverflow.com/internal-1">test-link-2</a>';
        const baseUrl = 'http://www.stackoverflow.com/aaa/bbb/ccc';
        const result = extract(htmlString, baseUrl);
        const expectedText = 'test-link-1 test-link-2';
        // The test should pass on the original code because it appends the text 
        // of the same url. The test should fail on the mutated code because it 
        // will not append the text of the same url.
        expect(result[0].text).toBe(expectedText);
    });
});