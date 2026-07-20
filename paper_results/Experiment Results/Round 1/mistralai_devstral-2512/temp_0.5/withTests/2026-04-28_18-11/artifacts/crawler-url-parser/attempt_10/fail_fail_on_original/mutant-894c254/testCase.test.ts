// test/removeQueryParameters.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters configuration', () => {
    it('should distinguish between UTM parameters at start vs middle of parameter name', () => {
        // This test would expose the difference if the configuration were applied
        const url1 = "http://example.com/path?utm_source=test&ref=keep";
        const url2 = "http://example.com/path?my_utm_source=test&ref=keep";

        const result1 = parse(url1);
        const result2 = parse(url2);

        // If the configuration were applied:
        // Original would remove utm_source but keep my_utm_source
        // Mutated would remove both utm_source and my_utm_source
        expect(result1?.search).toBe("?ref=keep");
        expect(result2?.search).toBe("?my_utm_source=test&ref=keep");
    });
});