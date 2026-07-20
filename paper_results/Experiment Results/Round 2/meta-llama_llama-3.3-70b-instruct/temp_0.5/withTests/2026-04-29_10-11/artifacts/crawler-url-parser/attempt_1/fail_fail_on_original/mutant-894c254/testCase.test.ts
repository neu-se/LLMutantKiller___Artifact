import { parse } from "../../../crawler-url-parser/crawler-url-parser";

describe('parse url with query parameters', function () {
    it('should parse url with query parameters correctly', function () {
        const url = "https://example.com/path?a=1&b=2&utm_source=google&utm_medium=cpc&utm_campaign=spring_sale";
        const expectedUrl = "https://example.com/path?a=1&b=2";
        const result = parse(url);
        expect(result.url).toBe(expectedUrl);
    });
});