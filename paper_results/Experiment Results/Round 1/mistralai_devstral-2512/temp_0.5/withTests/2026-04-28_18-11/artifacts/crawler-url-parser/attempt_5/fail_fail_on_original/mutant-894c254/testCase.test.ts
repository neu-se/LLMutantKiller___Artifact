// test/removeQueryParameters.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters configuration', () => {
    it('should handle mixed case UTM parameters correctly', () => {
        const url = "http://example.com/path?utm_SOURCE=test&UTM_medium=email&ref=keep";
        const result = parse(url);
        expect(result?.search).toBe("?ref=keep");
    });
});