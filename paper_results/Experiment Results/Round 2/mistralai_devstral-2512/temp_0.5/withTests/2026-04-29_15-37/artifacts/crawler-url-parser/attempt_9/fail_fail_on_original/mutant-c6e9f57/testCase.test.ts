import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL normalization', () => {
    it('should normalize URLs by removing www prefix when stripWWW is true', () => {
        const result = parse("http://www.example.com/path");
        expect(result).not.toBeNull();
        expect(result?.url).toBe("http://example.com/path");
    });
});