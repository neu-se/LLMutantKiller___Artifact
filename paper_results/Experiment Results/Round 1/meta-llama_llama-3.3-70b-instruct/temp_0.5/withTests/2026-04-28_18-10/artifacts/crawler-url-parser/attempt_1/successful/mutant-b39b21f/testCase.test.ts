import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should pass for parse function test', function () {
        let url = "https://github.com/Microsoft";
        let result = parse(url);
        expect(result).toHaveProperty("url");
        expect(result).toHaveProperty("baseurl");
        expect(result).toHaveProperty("protocol");
        expect(result).toHaveProperty("host");
        expect(result).toHaveProperty("domain");
        expect(result).toHaveProperty("subdomain");
        expect(result).toHaveProperty("path");
        expect(result).toHaveProperty("search");
        expect(result).toHaveProperty("querycount");
    });
});