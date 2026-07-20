import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function test', function () {
    it('should pass for "http://example.com"', function () {
        let url = "http://example.com";
        let result = parse(url);
        expect(result.url).toBe("http://example.com/");
    });

    it.skip('should fail for "http://"', function () {
        let url = "http://";
        let result = parse(url);
        expect(result).toBeNull();
    });
});