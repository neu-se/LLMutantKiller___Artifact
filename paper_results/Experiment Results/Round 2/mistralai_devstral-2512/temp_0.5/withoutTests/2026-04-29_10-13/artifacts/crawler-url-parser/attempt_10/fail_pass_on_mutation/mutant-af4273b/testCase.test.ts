import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
    it("should correctly parse base URL query parameters when resolving relative URLs", () => {
        const baseUrl = "http://example.com/path?key1=value1&key2=value2";
        const relativeUrl = "subpath";
        const result = parse(relativeUrl, baseUrl);

        expect(result).not.toBeNull();
        expect(result?.url).toBe("http://example.com/subpath");
        expect(result?.baseurl).toBe("http://example.com/path?key1=value1&key2=value2");
    });
});