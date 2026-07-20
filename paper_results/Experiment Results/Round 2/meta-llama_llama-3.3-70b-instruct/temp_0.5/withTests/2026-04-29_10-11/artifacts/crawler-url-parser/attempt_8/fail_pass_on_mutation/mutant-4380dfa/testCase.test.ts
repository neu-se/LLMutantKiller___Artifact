import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser";

describe('parse function', () => {
    it('should correctly parse URLs starting with "//"', () => {
        const originalUrl = "//";
        const parsedUrl = parse(originalUrl);
        expect(parsedUrl.url.startsWith("http")).toBe(true);
        expect(parsedUrl.protocol).toBe("http:");
    });
});