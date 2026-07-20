import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle the original code', () => {
        const baseUrlStr = "http://example.com/#anchor";
        const currentUrlStr = "";
        const result = parse(currentUrlStr, baseUrlStr);
        expect(result).toBe(null);
        const baseUrlStr2 = "http://example.com/#";
        const result2 = parse(currentUrlStr, baseUrlStr2);
        expect(result2).toBe(null);
    });
});