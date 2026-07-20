import { parse } from "./crawler-url-parser";

describe('crawler-url-parser', () => {
    it('should not strip WWW from the host when stripWWW is false', () => {
        const url = "http://www.example.com";
        const parsedUrl = parse(url);
        expect(parsedUrl.host).toBe('www.example.com');
    });
});