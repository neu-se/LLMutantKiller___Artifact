import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with fragment', () => {
        const url = "http://example.com/path#abc#def#ghi#abc\r\nabc\r\nabc\r\nabc\r\nabc\r\nabc\r\nabc\r\nabc\r\nabc\r\nabc\r\nabc\r\nabc";
        const result = parse(url);
        expect(result).not.toBeNull();
        expect(result.url).toBe("http://example.com/path");
    });
});