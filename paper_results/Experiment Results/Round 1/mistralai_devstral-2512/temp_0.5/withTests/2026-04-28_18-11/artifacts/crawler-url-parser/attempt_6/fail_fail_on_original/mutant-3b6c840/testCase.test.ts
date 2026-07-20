// test/removeTrailingSlash.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function trailing slash behavior', () => {
    it('should handle URLs with trailing slashes according to configuration', () => {
        const result = parse("http://example.com/path/");
        expect(result).not.toBeNull();
        if (result) {
            // This test expects the trailing slash to be removed in the original code
            // but kept in the mutated code where removeTrailingSlash is false
            expect(result.url).toBe("http://example.com/path");
        }
    });
});