import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with fragment containing hash symbol', () => {
    it('should correctly handle URLs with hash symbols in the fragment', () => {
        const url = "http://example.com/path?q=query#section#subsection";
        const result = parse(url);
        expect(result?.url).toBe("http://example.com/path?q=query");
    });
});