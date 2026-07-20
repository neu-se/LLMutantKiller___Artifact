import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
    it("should correctly preserve query parameters from base URL when resolving relative URLs", () => {
        const baseUrl = "http://example.com/path?key1=value1&key2=value2";
        const relativeUrl = "relative";
        const result = parse(relativeUrl, baseUrl);

        expect(result).not.toBeNull();
        expect(result?.url).toBe("http://example.com/relative");
        expect(result?.search).toBeNull();
        expect(result?.querycount).toBe(0);
        expect(result?.baseurl).toBe("http://example.com/path?key1=value1&key2=value2");
    });
});