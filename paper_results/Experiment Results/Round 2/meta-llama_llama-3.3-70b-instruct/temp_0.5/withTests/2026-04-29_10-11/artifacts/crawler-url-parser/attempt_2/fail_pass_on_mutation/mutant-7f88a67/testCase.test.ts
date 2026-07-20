import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url with https protocol', function () {
    it('should not normalize https protocol to http', function () {
        const url = "https://example.com";
        const result = parse(url);
        expect(result.url).not.toBe("http://example.com/");
    });
});