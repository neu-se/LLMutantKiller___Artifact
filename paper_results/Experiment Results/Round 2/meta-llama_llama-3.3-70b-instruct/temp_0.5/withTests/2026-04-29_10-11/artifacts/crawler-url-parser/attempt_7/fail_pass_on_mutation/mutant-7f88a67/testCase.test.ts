import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url with http protocol', function () {
    it('should not change protocol from http to https', function () {
        const url = "http://example.com";
        const result = parse(url);
        expect(result.url).not.toBe("https://example.com/");
    });
});