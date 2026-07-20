import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with same domain but different paths', () => {
    it('should return "sublevel" when linkurl has deeper path than pageurl', () => {
        const result = gettype("http://example.com/aaa/bbb", "http://example.com/aaa");
        expect(result).toBe("sublevel");
    });
});