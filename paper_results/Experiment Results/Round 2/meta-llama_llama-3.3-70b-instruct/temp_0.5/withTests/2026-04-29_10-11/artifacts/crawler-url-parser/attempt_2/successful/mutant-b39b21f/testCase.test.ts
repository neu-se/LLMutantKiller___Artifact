import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should test parse function with valid url', function () {
        let url = "https://www.npmjs.com/package/electron-window-manager";
        let result = parse(url);
        expect(result).not.toBeNull();
        expect(result.url).not.toBeNull();
        expect(result.protocol).not.toBeNull();
        expect(result.host).not.toBeNull();
        expect(result.path).not.toBeNull();
        expect(result.search).toBeNull();
        expect(result.querycount).toBe(0);
        expect(Object.keys(result)).toEqual(['url', 'baseurl', 'protocol', 'host', 'domain', 'subdomain', 'path', 'search', 'querycount']);
    });
});