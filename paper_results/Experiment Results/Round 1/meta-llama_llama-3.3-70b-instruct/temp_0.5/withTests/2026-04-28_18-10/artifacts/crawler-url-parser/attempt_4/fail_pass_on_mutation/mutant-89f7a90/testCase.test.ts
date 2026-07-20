import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should not append a string to the baseUrl when it has a fragment', () => {
        const currentUrl = 'http://example.com';
        const baseUrl = 'http://example.com#fragment';
        const result = parse(currentUrl, baseUrl);
        expect(result.url).not.toContain('Stryker was here!');
    });
});