import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL", () => {
    it("should correctly resolve relative URLs with query parameters when base URL has query parameters", () => {
        const baseUrl = "http://example.com/path?key=value";
        const relativeUrl = "subpath";
        const result = parse(relativeUrl, baseUrl);

        expect(result).not.toBeNull();
        expect(result?.url).toBe("http://example.com/subpath");
        expect(result?.path).toBe("/subpath");
        expect(result?.search).toBeNull();
        expect(result?.querycount).toBe(0);
    });
});