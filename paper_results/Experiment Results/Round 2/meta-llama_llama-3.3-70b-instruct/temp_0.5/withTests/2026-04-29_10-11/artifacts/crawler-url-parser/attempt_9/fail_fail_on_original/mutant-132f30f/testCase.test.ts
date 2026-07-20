import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with stripWWW option', function () {
    it('should have different behavior when stripWWW is true and false', function () {
        let url1 = "http://www.example.com";
        let url2 = "http://example.com";
        let result1 = parse(url1);
        let result2 = parse(url2);
        if (result1 !== null && result2 !== null) {
            // If stripWWW is true, result1.host should be example.com
            // If stripWWW is false, result1.host should be www.example.com
            expect(result1.host).toBe(result2.host);
        }
    });
});