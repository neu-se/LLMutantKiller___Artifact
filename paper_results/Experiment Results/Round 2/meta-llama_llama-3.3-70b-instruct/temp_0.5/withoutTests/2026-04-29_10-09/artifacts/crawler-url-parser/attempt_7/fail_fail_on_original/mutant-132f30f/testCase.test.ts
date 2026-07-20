import { parse } from "./crawler-url-parser";

describe('crawler-url-parser', () => {
    it('should strip WWW from the host', () => {
        const url1 = "http://www.example.com";
        const url2 = "http://example.com";
        const parsedUrl1 = parse(url1);
        const parsedUrl2 = parse(url2);
        expect(parsedUrl1.host).toBe(parsedUrl2.host);
    });
});