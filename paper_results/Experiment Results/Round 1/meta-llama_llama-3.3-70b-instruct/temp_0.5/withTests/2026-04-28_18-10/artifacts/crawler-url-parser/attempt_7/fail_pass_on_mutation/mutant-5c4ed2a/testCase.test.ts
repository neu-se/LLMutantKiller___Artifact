import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should pass when run against the original code and fail when run against the mutated code', () => {
        const url = "http://example.com#abc#def";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/");
    });
});