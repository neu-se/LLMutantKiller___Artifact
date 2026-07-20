import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL without protocol', () => {
        const url = "example.com";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/");
    });

    it('should correctly parse URL with protocol', () => {
        const url = "http://example.com";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/");
    });

    it('should correctly parse URL with protocol and path', () => {
        const url = "http://example.com/path";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/path");
    });

    it('should correctly parse URL without protocol and with path', () => {
        const url = "/path";
        const result = parse(url);
        expect(result.url).toBe("/path");
    });

    it('should correctly parse URL without protocol and with query parameters', () => {
        const url = "example.com?query=param";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/?query=param");
    });

    it('should correctly parse URL with protocol and query parameters', () => {
        const url = "http://example.com?query=param";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/?query=param");
    });
});