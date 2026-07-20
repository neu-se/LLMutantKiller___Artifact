import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URL with fragment', () => {
        const url = "https://www.example.com/path#anchor";
        const result = parse(url);
        expect(result.url).toBe("https://www.example.com/path");
        const url2 = "https://www.example.com/path#anchor#anotheranchor";
        const result2 = parse(url2);
        expect(result2.url).toBe("https://www.example.com/path");
    });
});