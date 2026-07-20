import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should parse url correctly', () => {
        const url = 'http://example.com/path?a=1&b=2&a=3';
        const result = parse(url);
        const query = result.search.substring(1); // remove the '?' character
        const params = query.split('&');
        const aValues = params.filter(param => param.startsWith('a=')).map(param => param.split('=')[1]);
        expect(aValues).toEqual(['1', '3']);
    });
});