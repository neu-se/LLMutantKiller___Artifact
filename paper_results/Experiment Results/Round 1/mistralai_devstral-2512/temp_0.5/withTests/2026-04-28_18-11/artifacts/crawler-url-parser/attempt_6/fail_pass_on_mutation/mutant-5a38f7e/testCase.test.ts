// test/mutant-5a38f7e.test.ts
import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with path containing index.html', () => {
    it('should correctly handle path with index.html', () => {
        const result = gettype("http://example.com/path/index.html", "http://example.com/path/");
        expect(result).toBe("samelevel");
    });
});