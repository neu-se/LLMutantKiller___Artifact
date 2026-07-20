import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url with https protocol', function () {
    it('should not change protocol from https to http', function () {
        const url = "https://example.com";
        const result = parse(url);
        expect(result.url.startsWith("http:")).toBe(false);
    });
});