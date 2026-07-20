import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function test', function () {
    it.skip('should pass for ""', function () {
        let url = "";
        let result = parse(url);
        expect(result).toBeNull();
    });

    it('should fail for "htp://example.com"', function () {
        let url = "htp://example.com";
        let result = parse(url);
        expect(result).toBeNull();
    });
});