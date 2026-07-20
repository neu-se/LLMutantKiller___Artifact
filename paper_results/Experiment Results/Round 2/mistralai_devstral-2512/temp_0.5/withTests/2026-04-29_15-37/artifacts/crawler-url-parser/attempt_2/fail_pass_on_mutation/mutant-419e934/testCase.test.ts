// test/mutant-419e934.test.ts

import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with index.html paths', () => {
    it('should correctly identify samelevel when both urls end with index.html', () => {
        const linkUrl = "http://example.com/aaa/bbb/index.html";
        const pageUrl = "http://example.com/aaa/bbb/index.html";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("samelevel");
    });
});