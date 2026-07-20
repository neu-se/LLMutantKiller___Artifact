import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should remove query parameters', function () {
        let originalRes = parse("http://www.google.com/aaa?q=example&utm_source=example&utm_medium=example");
        let mutatedRes = parse("http://www.google.com/aaa?q=example&utm_source=example&utm_medium=example");
        if (originalRes!== null && originalRes.search!== null && mutatedRes!== null && mutatedRes.search!== null) {
            expect(originalRes.querycount).toBeLessThan(mutatedRes.querycount);
        } else {
            expect(originalRes).not.toBeNull();
            expect(mutatedRes).not.toBeNull();
            expect(originalRes.search).not.toBeNull();
            expect(mutatedRes.search).not.toBeNull();
        }
    });
});