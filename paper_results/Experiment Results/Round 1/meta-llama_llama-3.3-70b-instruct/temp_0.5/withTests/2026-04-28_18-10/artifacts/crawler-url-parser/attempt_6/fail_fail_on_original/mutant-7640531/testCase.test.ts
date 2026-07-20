import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with fragment and newline', () => {
        const url = "http://example.com/path#\nhttp://example.com/def";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/path");
    });
});