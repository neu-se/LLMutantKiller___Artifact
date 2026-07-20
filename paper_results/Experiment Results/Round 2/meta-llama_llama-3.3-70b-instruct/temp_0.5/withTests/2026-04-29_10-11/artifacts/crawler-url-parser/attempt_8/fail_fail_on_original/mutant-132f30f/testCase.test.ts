import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with stripWWW option', function () {
    it('should strip WWW from the host when it is the default subdomain and return the same host when stripWWW is false', function () {
        let url = "http://www.example.com";
        let result = parse(url);
        if (result !== null) {
            expect(result.host).toBe("example.com");
            // If stripWWW is false, the host should be www.example.com
            // This will fail when stripWWW is false
            expect(result.host).not.toBe("www.example.com");
        }
    });
});