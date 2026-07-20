import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url with https protocol and normalizeHttps option', function () {
    it('should not normalize https to http when normalizeHttps is false', function () {
        const url = "https://example.com";
        const result = parse(url);
        expect(result.protocol).toBe("https:");
    });
});