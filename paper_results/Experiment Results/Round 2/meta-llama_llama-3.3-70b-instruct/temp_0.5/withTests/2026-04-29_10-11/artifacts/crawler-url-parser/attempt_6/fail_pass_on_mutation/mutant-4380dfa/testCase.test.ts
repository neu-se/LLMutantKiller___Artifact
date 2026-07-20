import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser";

describe('parse function', () => {
    it('should correctly parse URLs starting with "//"', () => {
        const originalUrl = "//www.stackoverflow.com";
        const parsedUrl = parse(originalUrl);
        expect(parsedUrl.url).toBe("http://www.stackoverflow.com/");
    });
});