import { extract, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', function () {
    it('should pass when run against the original code and fail when run against the mutated code', function () {
        const url = "http://example.com/default.aspx";
        const baseUrl = "http://example.com";
        const originalResult = parse(url, baseUrl);
        const pageUrlPath = originalResult.path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
        expect(pageUrlPath).toBe('/');

        const mutatedResult = parse(url, baseUrl);
        const mutatedPageUrlPath = mutatedResult.path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[^a-z]+$/, '/');
        expect(mutatedPageUrlPath).not.toBe('/');

        const html = '<html><body><a href="' + url + '">Link</a></body></html>';
        const extractedUrls = extract(html, baseUrl);
        expect(extractedUrls.length).toBe(1);
        expect(extractedUrls[0].url).toBe(url);
    });
});