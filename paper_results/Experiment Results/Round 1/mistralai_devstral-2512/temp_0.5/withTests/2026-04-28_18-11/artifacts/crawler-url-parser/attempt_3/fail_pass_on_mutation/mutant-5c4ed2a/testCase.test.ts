// test/mutant-5c4ed2a.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing fragment', () => {
    it('should correctly handle baseUrl with fragment when currentUrl is relative', () => {
        const result = parse("/path", "http://base.com#fragment");
        expect(result).not.toBeNull();
        if (result) {
            expect(result.url).toBe("http://base.com/path");
        }
    });
});