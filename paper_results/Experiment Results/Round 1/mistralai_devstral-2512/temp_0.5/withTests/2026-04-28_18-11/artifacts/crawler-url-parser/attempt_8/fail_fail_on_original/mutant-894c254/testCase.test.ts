// test/removeQueryParameters.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters configuration', () => {
    it('should remove UTM parameters with case-insensitive pattern matching', () => {
        const url = "http://example.com/path?UtM_SoUrCe=test&ref=keep";
        const result = parse(url);
        expect(result?.search).toBe("?ref=keep");
    });
});