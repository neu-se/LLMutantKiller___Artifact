import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should return the correct url', () => {
        const url = "http://www.example.com/path";
        const result = parse(url + "/");
        if (result !== null && result.url !== null) {
            expect(result.url).toEqual(url + "/");
        } else {
            expect(result).toBeNull();
        }
    });
});