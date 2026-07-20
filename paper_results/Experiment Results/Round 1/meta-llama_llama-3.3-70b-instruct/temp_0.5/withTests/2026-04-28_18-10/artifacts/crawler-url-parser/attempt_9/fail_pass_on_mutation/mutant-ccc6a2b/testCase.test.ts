import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', function () {
    it('should parse url and have a specific property', function () {
        const url = "https://www.npmjs.com/package/electron-window-manager";
        const result = parse(url);
        expect(result).not.toBeNull();
        expect(result.url).toBe("https://www.npmjs.com/package/electron-window-manager");
        expect(result.protocol).toBe("https:");
    });
});