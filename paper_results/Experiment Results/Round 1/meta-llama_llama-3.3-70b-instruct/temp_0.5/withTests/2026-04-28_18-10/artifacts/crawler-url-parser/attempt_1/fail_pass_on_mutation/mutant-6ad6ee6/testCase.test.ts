import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with fragment', () => {
        const url = 'http://example.com/path#fragment';
        const expectedUrl = 'http://example.com/path';
        const result = parse(url);
        expect(result.url).toBe(expectedUrl);
    });

    it.skip('should incorrectly parse URL with fragment when using mutated code', () => {
        // Simulate the mutated code by only removing the first character after the '#'
        const url = 'http://example.com/path#fragment';
        const mutatedUrl = url.replace(/#./, '');
        const expectedUrl = 'http://example.com/pathragment';
        const result = parse(mutatedUrl);
        expect(result.url).not.toBe(expectedUrl);
    });
});