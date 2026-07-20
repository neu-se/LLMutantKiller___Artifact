import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with stripWWW option', function () {
    it('should not strip WWW from non-default subdomains', function () {
        let url = "http://sub.www.example.com";
        let result = parse(url);
        if (result !== null) {
            expect(result.host).toBe("sub.www.example.com");
        }
    });
});