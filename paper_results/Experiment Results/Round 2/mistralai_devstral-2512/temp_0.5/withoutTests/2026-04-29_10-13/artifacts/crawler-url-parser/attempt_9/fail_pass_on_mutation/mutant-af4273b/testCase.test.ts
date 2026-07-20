import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
    it("should correctly handle base URL with query parameters when resolving relative URLs", () => {
        const baseUrl = "http://example.com/path?query=value";
        const relativeUrl = "subpath?another=param";
        const result = parse(relativeUrl, baseUrl);

        expect(result).not.toBeNull();
        expect(result?.url).toBe("http://example.com/subpath?another=param");
        expect(result?.search).toBe("?another=param");
        expect(result?.querycount).toBe(1);
        expect(result?.baseurl).toBe("http://example.com/path?query=value");
    });
});