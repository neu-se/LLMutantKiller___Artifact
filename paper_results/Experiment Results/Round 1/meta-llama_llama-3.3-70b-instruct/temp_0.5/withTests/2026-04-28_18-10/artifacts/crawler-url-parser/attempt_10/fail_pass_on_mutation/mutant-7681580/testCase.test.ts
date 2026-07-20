import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function test', function () {
    it('should pass for "http://example.com"', function () {
        let url = "http://example.com";
        let result = parse(url);
        expect(result.url).toBe("http://example.com/");
    });

    it('should fail for "javascript://example.com"', function () {
        let url = "javascript://example.com";
        let result = parse(url);
        expect(result).toBeNull();
    });
});