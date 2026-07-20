import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
    it("should correctly handle base URL query parameters when resolving relative URLs with their own query parameters", () => {
        const baseUrl = "http://example.com/base?baseParam=value";
        const relativeUrl = "relative?relParam=value";
        const result = parse(relativeUrl, baseUrl);

        expect(result).not.toBeNull();
        expect(result?.url).toBe("http://example.com/relative?relParam=value");
        expect(result?.search).toBe("?relParam=value");
        expect(result?.querycount).toBe(1);
        expect(result?.baseurl).toBe("http://example.com/base?baseParam=value");
    });
});