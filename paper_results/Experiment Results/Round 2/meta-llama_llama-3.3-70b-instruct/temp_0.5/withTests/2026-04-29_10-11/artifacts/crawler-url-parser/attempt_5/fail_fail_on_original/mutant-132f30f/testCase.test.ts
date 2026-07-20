import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with stripWWW option', function () {
    it('should strip WWW from the host when it is the default subdomain', function () {
        let url = "http://www.example.com";
        let result = parse(url);
        if (result !== null) {
            expect(result.host).toBe("example.com");
        }
    });
});