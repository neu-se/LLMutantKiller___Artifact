import { extract, gettype, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse and gettype', () => {
    it('should pass when linkurl_path ends with /index.html and pageurl_path ends with /', () => {
        let linkurl = "http://www.example.com/aaa/bbb/index.html";
        let pageurl = "http://www.example.com/aaa/bbb/";
        let linkUrlObject = parse(linkurl);
        let pageUrlObject = parse(pageurl);
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });

    it.skip('should fail when linkurl_path does not end with / and pageurl_path ends with /', () => {
        let linkurl = "http://www.example.com/aaa/bbb/index.html";
        let pageurl = "http://www.example.com/aaa/bbb/";
        linkurl = linkurl.replace(/\/index\.[a-z]+$/, '');
        let linkUrlObject = parse(linkurl);
        let pageUrlObject = parse(pageurl);
        let result = gettype(linkurl, pageurl);
        expect(result).not.toBe("samelevel");
    });
});