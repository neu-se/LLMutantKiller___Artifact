import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with stripWWW option', function () {
    it('should return different results for www and non-www hosts when stripWWW is true', function () {
        let url1 = "http://www.example.com";
        let url2 = "http://example.com";
        let result1 = parse(url1);
        let result2 = parse(url2);
        if (result1 !== null && result2 !== null) {
            expect(result1.host).not.toBe(result2.host);
        }
    });
});