import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with stripWWW option', function () {
    it.skip('should strip WWW from the host when it is the default subdomain', function () {
        let url = "http://www.example.com";
        let result = parse(url);
        expect(result.host).toBe("example.com");
    });

    it('should not strip WWW from the host when it is not the default subdomain', function () {
        let url = "http://example.com";
        let result = parse(url);
        expect(result.host).toBe("example.com");
    });
});