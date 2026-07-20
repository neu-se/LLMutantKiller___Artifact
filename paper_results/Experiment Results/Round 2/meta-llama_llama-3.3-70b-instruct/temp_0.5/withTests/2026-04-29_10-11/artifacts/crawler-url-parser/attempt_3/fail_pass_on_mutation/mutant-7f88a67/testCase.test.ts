import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url with https protocol', function () {
    it('should preserve original protocol', function () {
        const url = "https://example.com";
        const result = parse(url);
        expect(result.protocol).toBe("https:");
    });
});