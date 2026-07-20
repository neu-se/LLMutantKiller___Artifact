import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should parse url correctly', () => {
        const url = "http://example.com/path####";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/path");
    });
});