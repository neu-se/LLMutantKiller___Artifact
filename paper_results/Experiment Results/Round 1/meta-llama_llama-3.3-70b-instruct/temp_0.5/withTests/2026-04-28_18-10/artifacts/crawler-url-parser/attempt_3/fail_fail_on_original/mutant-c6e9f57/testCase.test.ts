import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should remove utm query parameters', function () {
        let res = parse("http://www.google.com?utm_source=example&utm_medium=example");
        expect(res.search).not.toContain("utm_source");
        expect(res.search).not.toContain("utm_medium");
    });
});