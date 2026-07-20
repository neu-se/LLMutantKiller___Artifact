import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with fragment', () => {
        const url = "http://example.com/path#a";
        const result = parse(url);
        expect(result.url).not.toBe("http://example.com/path#a");
    });
});