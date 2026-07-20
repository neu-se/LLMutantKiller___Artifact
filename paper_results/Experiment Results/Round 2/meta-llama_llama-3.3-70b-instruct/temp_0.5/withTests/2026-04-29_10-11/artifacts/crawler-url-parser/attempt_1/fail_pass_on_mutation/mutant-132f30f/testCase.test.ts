import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with stripWWW option', function () {
    it.skip('should strip WWW from the host', function () {
        let url = "http://www.example.com";
        let result = parse(url);
        expect(result.host).toBe("example.com");
    });

    it('should not strip WWW from non-default subdomains', function () {
        let url = "http://sub.www.example.com";
        let result = parse(url);
        expect(result.host).toBe("sub.www.example.com");
    });
});