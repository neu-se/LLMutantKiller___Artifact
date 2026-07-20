import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with fragment and query', () => {
        const url = "http://example.com/path?a=1#abc#def";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/path?a=1");
    });
});