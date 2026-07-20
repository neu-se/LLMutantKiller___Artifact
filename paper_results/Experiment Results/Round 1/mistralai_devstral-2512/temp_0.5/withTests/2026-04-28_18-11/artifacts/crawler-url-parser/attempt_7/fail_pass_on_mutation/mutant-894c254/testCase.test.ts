// test/removeQueryParameters.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters configuration', () => {
    it('should handle UTM parameters with different case patterns', () => {
        const url1 = "http://example.com/path?utm_source=test";
        const url2 = "http://example.com/path?UTM_SOURCE=test";
        const result1 = parse(url1);
        const result2 = parse(url2);
        expect(result1?.search).toBe("?utm_source=test");
        expect(result2?.search).toBe("?UTM_SOURCE=test");
    });
});