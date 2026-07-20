// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function URL handling', () => {
    it('should handle URLs with fragments correctly', () => {
        const result = parse("http://example.com/path#fragment");
        expect(result?.url).toBe("http://example.com/path");
    });
});