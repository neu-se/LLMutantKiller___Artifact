// test/removeQueryParameters.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters configuration', () => {
    it('should not remove ref parameter when UTM parameter is present', () => {
        const urlWithRef = "http://example.com/path?ref=somevalue&other=param";
        const result = parse(urlWithRef);
        expect(result?.search).toBe("?ref=somevalue&other=param");
    });
});