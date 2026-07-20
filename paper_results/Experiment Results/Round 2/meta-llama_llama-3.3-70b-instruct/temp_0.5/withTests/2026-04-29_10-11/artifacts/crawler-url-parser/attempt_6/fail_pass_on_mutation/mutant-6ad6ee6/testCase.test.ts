import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', function () {
    it('should parse url with fragment correctly', function () {
        const url = "http://example.com/path?a=1#abcde";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/path?a=1");
    });

    it('should fail on mutated code for url with fragment of length more than 1', function () {
        const url = "http://example.com/path?a=1#abcdef";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/path?a=1");
    });
});