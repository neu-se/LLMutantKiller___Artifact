// test/removeQueryParameters.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters configuration', () => {
    it('should handle UTM parameters with different case patterns in mixed case', () => {
        // Test URL with UTM parameter that should be removed with case-insensitive matching
        const url = "http://example.com/path?UTM_SOURCE=test&ref=keep";
        const result = parse(url);

        // The original code should remove UTM_SOURCE (case-insensitive match)
        // The mutated code would not remove it (case-sensitive match)
        expect(result?.search).toBe("?ref=keep");
    });
});