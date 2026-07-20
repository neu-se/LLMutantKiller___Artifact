import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
    it("should correctly resolve relative URLs when base URL contains query parameters that should be preserved in baseurl", () => {
        const baseUrl = "http://example.com/base/path?key=value&foo=bar";
        const relativeUrl = "../relative";
        const result = parse(relativeUrl, baseUrl);

        expect(result).not.toBeNull();
        expect(result?.url).toBe("http://example.com/relative");
        expect(result?.baseurl).toBe("http://example.com/base/path?key=value&foo=bar");
    });
});