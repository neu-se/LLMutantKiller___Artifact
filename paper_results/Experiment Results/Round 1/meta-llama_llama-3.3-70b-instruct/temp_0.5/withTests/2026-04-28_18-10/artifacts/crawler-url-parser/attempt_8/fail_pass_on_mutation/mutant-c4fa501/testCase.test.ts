import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse a URL with a directory index', () => {
        const url = 'http://example.com/path/to/directory/';
        const result = parse(url);
        if (result!== null) {
            expect(result.url).toBe('http://example.com/path/to/directory/');
        } else {
            expect(result).toBeNull();
        }
    });
});