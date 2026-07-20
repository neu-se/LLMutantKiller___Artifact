import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser";

describe('parse function', () => {
    it('should correctly parse URLs starting with "//"', () => {
        const originalUrl = "//www.stackoverflow.com/aaa/bbb/ccc";
        const parsedUrl = parse(originalUrl);
        expect(parsedUrl.url.startsWith("http")).toBe(true);
    });
});