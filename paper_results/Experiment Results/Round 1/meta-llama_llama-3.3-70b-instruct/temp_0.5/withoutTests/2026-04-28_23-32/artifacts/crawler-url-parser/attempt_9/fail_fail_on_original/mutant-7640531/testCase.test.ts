import { parse } from "./crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URL with multiple fragments', () => {
        const url = "https://www.example.com/path#anchor#anotheranchor";
        const result = parse(url);
        expect(result.url).toBe("https://www.example.com/path");
    });
});