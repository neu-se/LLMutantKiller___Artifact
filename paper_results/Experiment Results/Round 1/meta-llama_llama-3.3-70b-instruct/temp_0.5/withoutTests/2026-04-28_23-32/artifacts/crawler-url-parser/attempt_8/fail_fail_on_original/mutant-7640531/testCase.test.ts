import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URL with multiple fragments', () => {
        const url = "https://www.example.com/path#anchor#anotheranchor";
        const resultOriginal = parse("https://www.example.com/path#anchor");
        expect(resultOriginal.url).toBe("https://www.example.com/path");
        const resultMutated = parse(url);
        expect(resultMutated.url).not.toBe("https://www.example.com/path#anotheranchor");
    });
});