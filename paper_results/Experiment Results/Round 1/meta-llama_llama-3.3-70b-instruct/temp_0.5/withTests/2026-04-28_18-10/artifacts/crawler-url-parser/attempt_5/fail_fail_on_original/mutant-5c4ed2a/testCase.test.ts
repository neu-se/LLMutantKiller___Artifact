import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should pass when run against the original code and fail when run against the mutated code', () => {
        const url = "http://example.com#abc";
        const baseUrl = "http://example.com#def";
        const result = parse(url, baseUrl);
        expect(result.baseurl).toBe("http://example.com/");
    });
});