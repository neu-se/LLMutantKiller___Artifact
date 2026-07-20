import { parse } from "./crawler-url-parser";

describe('parse function', () => {
    it('should correctly handle URL with fragment', () => {
        const url = "https://www.example.com/path#anchor#anotheranchor";
        const resultOriginal = parse("https://www.example.com/path#anchor#anotheranchor");
        const resultMutated = parse("https://www.example.com/path#anchor#anotheranchor");
        expect(resultOriginal.url).toBe("https://www.example.com/path");
        expect(resultMutated.url).not.toBe("https://www.example.com/path#anotheranchor");
    });
});