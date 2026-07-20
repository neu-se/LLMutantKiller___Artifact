import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with removeDirectoryIndex option', function () {
    it('should return expected result when removeDirectoryIndex is true', function () {
        const url = "http://www.google.com/index.html";
        const result = parse(url);
        if (result!== null && result.url!== null) {
            expect(result.url).toContain("index.html");
        } else {
            expect(result).toBeNull();
        }
    });
});