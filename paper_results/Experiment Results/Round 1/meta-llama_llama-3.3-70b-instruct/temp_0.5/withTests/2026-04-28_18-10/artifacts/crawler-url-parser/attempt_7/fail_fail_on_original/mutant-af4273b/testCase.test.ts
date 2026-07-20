import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with query parameters and baseUrl that has query parameters', () => {
        const url = '../path?a=1&b=2';
        const baseUrl = 'http://example.com/base?a=3&b=4#e=5';
        const result = parse(url, baseUrl);
        if (result.baseurl === null) {
            throw new Error("baseurl is null");
        }
        expect(result.baseurl).toBe('http://example.com/base?a=3&b=4#e=5');
    });
});