import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should pass when run against the original code and fail when run against the mutated code', () => {
        const url = "http://example.com#abc#def#ghi";
        const baseUrl = "http://example.com#jkl#mno#pqr#stu";
        const result = parse(url, baseUrl);
        expect(result.baseurl).not.toBe("http://example.com#jkl#mno");
    });
});