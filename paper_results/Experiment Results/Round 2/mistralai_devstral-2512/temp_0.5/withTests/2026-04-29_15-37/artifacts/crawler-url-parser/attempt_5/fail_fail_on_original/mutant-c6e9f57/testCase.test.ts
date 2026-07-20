// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL normalization options', () => {
    it('should normalize URLs by removing trailing slashes', () => {
        const result = parse("http://example.com/path/");
        expect(result.url).toBe("http://example.com/path");
    });
});