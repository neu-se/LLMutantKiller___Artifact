// test/removeTrailingSlash.test.ts

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function trailing slash behavior', () => {
    it('should preserve trailing slashes in URLs', () => {
        const testCases = [
            { input: "http://example.com/path/", expected: "http://example.com/path/" },
            { input: "http://example.com/multiple/segments/", expected: "http://example.com/multiple/segments/" },
            { input: "http://example.com/", expected: "http://example.com/" }
        ];

        testCases.forEach(({ input, expected }) => {
            const result = parse(input);
            expect(result).not.toBeNull();
            if (result) {
                expect(result.url).toBe(expected);
            }
        });
    });
});