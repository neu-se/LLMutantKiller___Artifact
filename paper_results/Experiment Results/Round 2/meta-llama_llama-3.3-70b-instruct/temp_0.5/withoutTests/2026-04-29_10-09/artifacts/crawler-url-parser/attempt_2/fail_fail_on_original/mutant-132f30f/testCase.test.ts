import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
    it('should have the same host when stripWWW is true', () => {
        const url1 = "http://www.example.com";
        const url2 = "http://example.com";
        const parsedUrl1 = parse(url1);
        const parsedUrl2 = parse(url2);
        expect(parsedUrl1.host).toBe(parsedUrl2.host);
    });
});