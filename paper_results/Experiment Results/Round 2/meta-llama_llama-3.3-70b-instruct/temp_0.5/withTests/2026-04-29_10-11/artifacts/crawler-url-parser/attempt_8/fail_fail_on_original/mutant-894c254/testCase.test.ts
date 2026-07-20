import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url with query parameters', function () {
    it('should parse url with query parameters correctly', function () {
        const url = "https://example.com/path?utm_source=google&utm_medium=cpc&utm_campaign=spring_sale&ref=example";
        const result = parse(url);
        if (result) {
            expect(result.search).not.toContain('utm_source');
            expect(result.search).not.toContain('ref');
        } else {
            expect(result).not.toBeNull();
        }
    });
});