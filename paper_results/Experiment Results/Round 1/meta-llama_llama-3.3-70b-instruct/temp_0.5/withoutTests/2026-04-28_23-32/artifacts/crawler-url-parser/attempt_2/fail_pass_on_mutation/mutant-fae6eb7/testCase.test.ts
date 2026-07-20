import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle the original code', () => {
        const baseUrlStr = "http://example.com/#anchor";
        const currentUrlStr = "relative/path";
        const result = parse(currentUrlStr, baseUrlStr);
        expect(result.baseurl).toBe("http://example.com/");
    });
});