// test/removeQueryParameters.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters configuration', () => {
    it('should handle case-insensitive UTM parameters correctly', () => {
        const urlWithUTM = "http://example.com/path?UTM_SOURCE=test&ref=somevalue";
        const result = parse(urlWithUTM);
        expect(result.search).toBe("?ref=somevalue");
    });
});