import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser";

describe('parse function', () => {
    it('should correctly parse URLs starting with "//"', () => {
        const originalUrl = "//example.com";
        const parsedUrl = parse(originalUrl);
        expect(parsedUrl.url).not.toBe(originalUrl);
    });
});