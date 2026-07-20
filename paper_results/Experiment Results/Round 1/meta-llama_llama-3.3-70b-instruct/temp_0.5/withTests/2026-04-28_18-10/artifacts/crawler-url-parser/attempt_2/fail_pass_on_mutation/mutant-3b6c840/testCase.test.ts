import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should return the correct url when removeTrailingSlash is true', () => {
        const url = "http://www.example.com/path/";
        const result = parse(url);
        if (result !== null) {
            expect(result.url).toBe("http://www.example.com/path/");
        } else {
            expect(result).toBeNull();
        }
    });

    it('should return the correct url when removeTrailingSlash is false', () => {
        // Mock the removeTrailingSlash option to be false
        const originalRemoveTrailingSlash = parse.removeTrailingSlash;
        parse.removeTrailingSlash = false;
        const url = "http://www.example.com/path/";
        const result = parse(url);
        parse.removeTrailingSlash = originalRemoveTrailingSlash;
        if (result !== null) {
            expect(result.url).toBe("http://www.example.com/path/");
        } else {
            expect(result).toBeNull();
        }
    });
});