// test/removeQueryParameters.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters configuration', () => {
    it('should remove UTM parameters case-insensitively but not affect other parameters', () => {
        const url = "http://example.com/path?Utm_Campaign=test&ref=keep&other=value";
        const result = parse(url);
        expect(result?.search).toBe("?ref=keep&other=value");
    });
});