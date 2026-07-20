// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with fragment handling', () => {
    it('should correctly handle URLs with fragments containing more than one character', () => {
        const result = parse("http://example.com/path#test");
        expect(result.url).toBe("http://example.com/path");
    });
});