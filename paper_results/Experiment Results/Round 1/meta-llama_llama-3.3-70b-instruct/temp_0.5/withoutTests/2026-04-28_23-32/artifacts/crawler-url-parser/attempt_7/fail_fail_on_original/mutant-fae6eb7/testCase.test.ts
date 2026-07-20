import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle the original code', () => {
        const baseUrlStr = "http://example.com/#anchor";
        const currentUrlStr = "http://example.com/#";
        const resultOriginal = parse(currentUrlStr, baseUrlStr);
        expect(resultOriginal).toBeNull();
        const baseUrlStr2 = "http://example.com/#";
        const resultMutated = parse(currentUrlStr, baseUrlStr2);
        expect(resultMutated).not.toBeNull();
    });
});