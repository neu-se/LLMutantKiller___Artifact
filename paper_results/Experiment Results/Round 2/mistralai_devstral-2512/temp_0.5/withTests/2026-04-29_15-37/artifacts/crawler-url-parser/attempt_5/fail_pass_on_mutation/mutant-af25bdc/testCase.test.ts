import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with trailing slash', () => {
    it('should correctly handle URLs with trailing slashes', () => {
        const result = parse("http://example.com/path/");
        expect(result).not.toBeNull();
        expect(result?.url).toBe("http://example.com/path/");
        expect(result?.host).toBe("example.com");
        expect(result?.protocol).toBe("http:");
    });
});