import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with removeDirectoryIndex option', function () {
    it('should return expected result when removeDirectoryIndex is true', function () {
        const url = "http://www.google.com/default.html";
        const result = parse(url);
        if (result!== null) {
            expect(result.url).not.toBe("http://www.google.com/default.html");
        } else {
            expect(result).toBeNull();
        }
    });
});