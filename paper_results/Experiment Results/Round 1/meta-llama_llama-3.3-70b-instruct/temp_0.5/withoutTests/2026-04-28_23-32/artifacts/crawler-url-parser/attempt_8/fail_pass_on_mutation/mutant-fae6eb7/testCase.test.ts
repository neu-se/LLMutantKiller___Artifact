import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle the original code', () => {
        const baseUrlStr = "http://example.com/#anchor";
        const currentUrlStr = "http://example.com/#anchor";
        const resultOriginal = parse(currentUrlStr, baseUrlStr);
        expect(resultOriginal.url).toBe("http://example.com/");
        const baseUrlStr2 = "http://example.com/#";
        const resultMutated = parse(currentUrlStr, baseUrlStr2);
        expect(resultMutated.url).not.toBe("http://example.com/#");
    });
});