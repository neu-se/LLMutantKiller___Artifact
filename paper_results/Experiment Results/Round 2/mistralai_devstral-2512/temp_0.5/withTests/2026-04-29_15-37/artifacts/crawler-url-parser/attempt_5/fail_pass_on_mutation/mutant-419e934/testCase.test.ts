// test/mutant-419e934.test.ts

import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default.html paths', () => {
    it('should correctly identify uplevel when pageurl ends with default.html', () => {
        const linkUrl = "http://example.com/aaa/bbb";
        const pageUrl = "http://example.com/aaa/bbb/ccc/default.html";
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe("uplevel");
    });
});