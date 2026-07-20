import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', function () {
    it('should parse url with fragment correctly', function () {
        const url = "http://example.com/path?a=1#abcde";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/path?a=1");
    });

    it('should parse url with fragment correctly when fragment has only one character', function () {
        const url = "http://example.com/path?a=1#a";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/path?a=1");
    });
});