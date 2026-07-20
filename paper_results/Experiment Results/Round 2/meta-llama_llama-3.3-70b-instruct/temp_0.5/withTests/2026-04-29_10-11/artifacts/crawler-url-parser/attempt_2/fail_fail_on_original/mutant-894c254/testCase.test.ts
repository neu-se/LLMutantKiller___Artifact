import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url with query parameters', function () {
    it('should parse url with query parameters correctly', function () {
        const url = "https://example.com/path?a=1&b=2&utm_source=google&utm_medium=cpc&utm_campaign=spring_sale";
        const result = parse(url);
        expect(result.search).not.toContain('utm_source');
        expect(result.search).not.toContain('utm_medium');
        expect(result.search).not.toContain('utm_campaign');
    });
});