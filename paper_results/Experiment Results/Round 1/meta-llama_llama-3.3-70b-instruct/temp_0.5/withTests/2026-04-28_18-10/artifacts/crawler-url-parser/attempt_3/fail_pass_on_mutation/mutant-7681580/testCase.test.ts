import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function test', function () {
    it('should pass for "http://example.com"', function () {
        let url = "http://example.com";
        let result = parse(url);
        expect(result.url).toBe("http://example.com/");
    });

    it('should pass for "https://example.com"', function () {
        let url = "https://example.com";
        let result = parse(url);
        expect(result.url).toBe("https://example.com/");
    });

    it.skip('should fail for "://example.com"', function () {
        let url = "://example.com";
        let result = parse(url);
        expect(result).toBeNull();
    });
});