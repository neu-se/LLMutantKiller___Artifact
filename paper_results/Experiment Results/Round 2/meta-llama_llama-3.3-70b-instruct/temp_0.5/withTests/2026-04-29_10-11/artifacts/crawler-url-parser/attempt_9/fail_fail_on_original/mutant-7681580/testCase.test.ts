import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL without protocol', () => {
        const url = ":http://example.com";
        const result = parse(url);
        expect(result).toBeNull();
    });
});