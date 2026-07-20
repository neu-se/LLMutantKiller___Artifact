import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function test', function () {
    it('should pass for "http://example.com/path"', function () {
        let url = "http://example.com/path";
        let result = parse(url);
        expect(result.url).toBe("http://example.com/path");
    });

    it.skip('should fail for ":80"', function () {
        let url = ":80";
        let result = parse(url);
        expect(result).toBeNull();
    });
});