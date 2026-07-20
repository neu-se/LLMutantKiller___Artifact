// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL normalization options', () => {
    it('should normalize URLs by removing www prefix', () => {
        const result = parse("http://www.example.com/path");
        expect(result.url).toBe("http://example.com/path");
    });
});