import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with fragment', () => {
        const url = "http://example.com/path#fragment";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/path");
    });

    it('should incorrectly parse URL with fragment when using mutated code', () => {
        // This test will fail when run against the mutated code
        const url = "http://example.com/path#fragment";
        const result = parse(url);
        expect(result.url).not.toBe("http://example.com/path#");
    });
});