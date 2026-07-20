import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should parse url correctly', () => {
        const url = 'http://example.com/path?a=1&a=2&a=3&a=4';
        const result = parse(url);
        if (result === null) {
            throw new Error('Result is null');
        }
        if (result.search === null) {
            throw new Error('Search is null');
        }
        const searchParams = result.search.substring(1).split('&');
        const aParams = searchParams.filter(param => param.startsWith('a='));
        expect(aParams.length).toBe(1);
    });
});