import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle the original code', () => {
        const baseUrlStr = "http://example.com/#anchor";
        const currentUrlStr = "http://example.com/#anchor";
        const result = parse(currentUrlStr, baseUrlStr);
        expect(result.url).toBe("http://example.com/");
        const baseUrlStr2 = "http://example.com/#";
        const result2 = parse(currentUrlStr, baseUrlStr2);
        expect(result2.url).toBe("http://example.com/");
    });
});