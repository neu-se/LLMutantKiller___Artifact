// test/removeTrailingSlash.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function trailing slash behavior', () => {
    it('should handle trailing slashes consistently', () => {
        // Test multiple URLs with trailing slashes
        const testCases = [
            "http://example.com/path/",
            "http://example.com/multiple/segments/",
            "http://example.com/single/"
        ];

        testCases.forEach(url => {
            const result = parse(url);
            expect(result).not.toBeNull();
            if (result) {
                // In original code, trailing slash should be removed
                // In mutated code, trailing slash should be kept
                expect(result.url.endsWith('/')).toBe(false);
            }
        });
    });
});