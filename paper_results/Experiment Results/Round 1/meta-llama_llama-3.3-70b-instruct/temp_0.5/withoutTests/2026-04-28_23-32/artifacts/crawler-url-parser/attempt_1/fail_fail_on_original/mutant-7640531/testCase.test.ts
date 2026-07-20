import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URL with fragment', () => {
        const url = "https://www.example.com/path#anchor";
        const expectedUrl = "https://www.example.com/path";
        const result = parse(url);
        expect(result.url).toBe(expectedUrl);
    });
});