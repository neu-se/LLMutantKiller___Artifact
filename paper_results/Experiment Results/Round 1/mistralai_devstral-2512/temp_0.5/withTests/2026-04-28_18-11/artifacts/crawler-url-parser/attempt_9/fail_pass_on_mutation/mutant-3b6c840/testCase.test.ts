// test/removeTrailingSlash.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function trailing slash behavior', () => {
    it('should not apply removeTrailingSlash normalization by default', () => {
        const result = parse("http://example.com/path/");
        expect(result).not.toBeNull();
        if (result) {
            // Current implementation doesn't use the normalization options
            // so trailing slash should be preserved
            expect(result.url).toBe("http://example.com/path/");
        }
    });
});