// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with fragment handling', () => {
    it('should correctly handle URLs with fragments containing exactly two characters', () => {
        const result = parse("http://example.com/path#ab");
        expect(result.url).toBe("http://example.com/path");
    });
});