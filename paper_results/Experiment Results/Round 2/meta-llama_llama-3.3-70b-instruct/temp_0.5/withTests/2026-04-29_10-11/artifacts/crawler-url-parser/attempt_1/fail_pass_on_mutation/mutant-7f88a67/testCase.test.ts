import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url with https protocol', function () {
    it('should normalize https protocol', function () {
        const url = "https://example.com";
        const result = parse(url);
        expect(result.url).toBe("https://example.com/");
    });
});