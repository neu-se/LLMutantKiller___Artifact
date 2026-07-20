// test/removeQueryParameters.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters configuration', () => {
    it('should remove UTM parameters with case-insensitive matching', () => {
        const url = "http://example.com/path?UTM_source=test&utm_medium=email&ref=keep";
        const result = parse(url);
        expect(result?.search).toContain("ref=keep");
        expect(result?.search).not.toContain("UTM_source");
        expect(result?.search).not.toContain("utm_medium");
    });
});