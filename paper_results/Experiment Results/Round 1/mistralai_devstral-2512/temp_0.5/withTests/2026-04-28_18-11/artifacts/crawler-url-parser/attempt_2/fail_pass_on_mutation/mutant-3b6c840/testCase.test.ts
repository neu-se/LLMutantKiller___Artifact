// test/removeTrailingSlash.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function trailing slash behavior', () => {
    it('should keep trailing slash in URL path when removeTrailingSlash is false', () => {
        const result = parse("http://example.com/path/");
        expect(result).not.toBeNull();
        if (result) {
            expect(result.url).toBe("http://example.com/path/");
        }
    });
});