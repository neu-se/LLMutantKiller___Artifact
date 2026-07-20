// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL normalization options', () => {
    it('should handle URLs with ref query parameter', () => {
        const result = parse("http://example.com/path?ref=test&param=value");
        // In the original code with normalize options, ref should be removed
        // In mutated code without options, it should remain
        expect(result.url).toBe("http://example.com/path?param=value");
    });
});