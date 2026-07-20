// test/mutant-5c4ed2a.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing fragment', () => {
    it('should correctly strip fragments from baseUrl when they contain multiple characters', () => {
        const result = parse("http://example.com/path", "http://base.com/base#abc123");
        expect(result).not.toBeNull();
        if (result) {
            expect(result.baseurl).toBe("http://base.com/base");
        }
    });
});