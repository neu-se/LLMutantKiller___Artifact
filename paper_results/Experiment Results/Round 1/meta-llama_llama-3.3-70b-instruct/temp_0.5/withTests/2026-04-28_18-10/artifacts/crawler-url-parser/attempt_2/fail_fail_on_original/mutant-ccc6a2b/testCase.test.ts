import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', function () {
    it('should parse url', function () {
        const url = "https ://www.npmjs.com/package/electron-window-manager";
        const result = parse(url);
        expect(result).not.toBeNull();
    });
});