import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
    it("should correctly handle relative URLs with query parameters when base URL has query parameters", () => {
        const baseUrl = "http://example.com/path?baseKey=baseValue";
        const relativeUrl = "subpath?relKey=relValue";
        const result = parse(relativeUrl, baseUrl);

        expect(result).not.toBeNull();
        expect(result?.url).toBe("http://example.com/subpath?relKey=relValue");
        expect(result?.search).toBe("?relKey=relValue");
        expect(result?.querycount).toBe(1);
        expect(result?.baseurl).toBe("http://example.com/path?baseKey=baseValue");
    });
});