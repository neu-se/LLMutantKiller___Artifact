import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL without protocol', () => {
        const url = "example.com#hash";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/");
    });
});