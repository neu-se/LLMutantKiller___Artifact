// test/removeQueryParameters.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters configuration', () => {
    it('should remove query parameters matching /^utm_\\w+/i but not /utm_\\w+/i', () => {
        const urlWithUTM = "http://example.com/path?utm_source=test&ref=somevalue&UTM_CAMPAIGN=another";
        const result = parse(urlWithUTM);
        expect(result.search).toBe("?ref=somevalue");
    });
});