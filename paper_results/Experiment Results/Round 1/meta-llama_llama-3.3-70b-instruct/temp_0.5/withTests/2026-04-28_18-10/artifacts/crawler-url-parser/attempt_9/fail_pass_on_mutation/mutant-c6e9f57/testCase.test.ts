import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should remove query parameters', function () {
        let res = parse("http://www.google.com/aaa?q=example&utm_source=example&utm_medium=example");
        if (res !== null && res.search !== null) {
            expect(res.querycount).toBe(3);
        } else {
            expect(res).not.toBeNull();
            expect(res.search).not.toBeNull();
        }
    });
});