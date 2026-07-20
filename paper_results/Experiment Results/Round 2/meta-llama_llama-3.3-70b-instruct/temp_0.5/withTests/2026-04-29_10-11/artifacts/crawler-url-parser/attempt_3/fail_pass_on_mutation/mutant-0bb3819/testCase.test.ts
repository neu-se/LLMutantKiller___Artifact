import { gettype, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype', () => {
    it('should pass on original and fail on mutated code', () => {
        let linkurl = "http://www.example.com/aaa/bbb/index.html";
        let pageurl = "http://www.example.com/aaa/bbb/default.aspx";
        let linkUrlObject = parse(linkurl);
        let pageUrlObject = parse(pageurl);
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});