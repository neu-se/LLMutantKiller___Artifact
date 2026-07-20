import { parse } from "../../../crawler-url-parser.js";

describe('crawler-url-parser', () => {
    it('should strip WWW from the host when stripWWW is true', () => {
        const url = "http://www.example.com";
        const parsedUrl = parse(url);
        expect(parsedUrl.host).not.toBe('www.example.com');
    });
});