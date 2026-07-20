import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function URL processing', () => {
    it('should handle URLs with double slashes correctly', () => {
        const result = parse("//example.com/path");
        expect(result).not.toBeNull();
        expect(result?.url).toBe("http://example.com/path");
    });
});