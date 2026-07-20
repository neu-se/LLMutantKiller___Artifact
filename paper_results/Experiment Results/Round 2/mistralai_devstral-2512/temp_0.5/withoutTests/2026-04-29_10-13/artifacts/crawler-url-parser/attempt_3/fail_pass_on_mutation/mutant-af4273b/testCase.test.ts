import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
    it("should correctly handle query parameters in base URL when resolving relative URLs", () => {
        const baseUrl = "http://example.com/path?query=value&another=param";
        const relativeUrl = "subpath";
        const result = parse(relativeUrl, baseUrl);

        expect(result).not.toBeNull();
        expect(result?.url).toBe("http://example.com/subpath");
        expect(result?.path).toBe("/subpath");
        expect(result?.search).toBeNull();
        expect(result?.querycount).toBe(0);
        expect(result?.baseurl).toBe("http://example.com/path?query=value&another=param");
    });
});