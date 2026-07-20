import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse baseUrl with fragment', () => {
    it('should correctly handle baseUrl with fragment containing multiple characters', () => {
        const result = parse("http://example.com/path", "http://base.example.com#fragment123");
        expect(result?.baseurl).toBe("http://base.example.com/");
    });
});