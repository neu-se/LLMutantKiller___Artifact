import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should parse url correctly', () => {
        const url = 'http://example.com/path?a=1&a=2&a=3';
        const result = parse(url);
        if (result === null) {
            throw new Error('Result is null');
        }
        const query = result.search.substring(1); // remove the '?' character
        const params = query.split('&');
        const aValues = params.filter((param: string) => param.startsWith('a=')).map((param: string) => param.split('=')[1]);
        expect(aValues.length).toBe(3);
        expect(aValues).toEqual(['1', '2', '3']);
    });
});