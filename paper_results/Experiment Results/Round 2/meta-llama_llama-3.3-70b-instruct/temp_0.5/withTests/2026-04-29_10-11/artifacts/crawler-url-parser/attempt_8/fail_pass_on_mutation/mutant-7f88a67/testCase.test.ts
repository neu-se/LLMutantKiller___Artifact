import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url with http protocol', function () {
    it('should not normalize http to https', function () {
        const url = "http://example.com";
        const result = parse(url);
        expect(result.protocol).toBe("http:");
    });
});