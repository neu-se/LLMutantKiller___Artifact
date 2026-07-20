// test/mutant-5c4ed2a.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing fragment', () => {
    it('should correctly handle baseUrl with fragment containing multiple characters', () => {
        const result = parse("http://example.com/path", "http://base.com/base#fragment");
        expect(result).not.toBeNull();
        if (result) {
            expect(result.url).toBe("http://example.com/path");
        }
    });
});