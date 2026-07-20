import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', function () {
    it('should fail on mutated code for url with fragment of length 2', function () {
        const url = "http://example.com/path?a=1#ab";
        const result = parse(url);
        expect(result.url).not.toBe("http://example.com/path?a=1#b");
    });
});