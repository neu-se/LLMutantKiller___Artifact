import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse protocol-less URLs without base URL', () => {
    it('should handle protocol-less URLs starting with // when no base URL is provided', () => {
        const result = parse("//example.com/path");
        expect(result).not.toBeNull();
        expect(result?.url).toBe("http://example.com/path");
        expect(result?.protocol).toBe("http:");
        expect(result?.host).toBe("example.com");
        expect(result?.path).toBe("/path");
    });
});