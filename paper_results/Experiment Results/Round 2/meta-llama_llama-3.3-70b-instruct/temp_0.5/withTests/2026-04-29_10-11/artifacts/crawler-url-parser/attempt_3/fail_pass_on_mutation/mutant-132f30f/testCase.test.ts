import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with stripWWW option', function () {
    it('should return the same host when stripWWW is true and the host does not start with www', function () {
        let url = "http://example.com";
        let result = parse(url);
        expect(result.host).toBe("example.com");
    });

    it('should return the same host when stripWWW is false and the host starts with www', function () {
        let url = "http://www.example.com";
        let result = parse(url);
        expect(result.host).toBe("www.example.com");
    });
});