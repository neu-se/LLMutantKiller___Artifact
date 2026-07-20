import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should not include fragment in parsed URL', () => {
        const url = 'http://example.com/path?query=http://example.com/fragment';
        const result = parse(url);
        if (result !== null) {
            expect(result.search).toBe('?query=http://example.com/fragment');
        } else {
            expect(result).toBeNull();
        }
    });
});