import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function test', function () {
    it('should pass for "example.com"', function () {
        let url = "example.com";
        let result = parse(url);
        expect(result.url).toBe("http://example.com/");
    });

    it.skip('should fail for "example.com:80"', function () {
        let url = "example.com:80";
        let result = parse(url);
        expect(result).toBeNull();
    });
});