import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should return the correct result when linkurl_path is empty string', function () {
        let linkurl = "http://example.com";
        let result = parse(linkurl);
        expect(result.url).toBe("http://example.com/");
    });

    it('should return null when linkurl has invalid protocol', function () {
        let linkurl = "htp://example.com";
        let result = parse(linkurl);
        expect(result).toBeNull();
    });
});