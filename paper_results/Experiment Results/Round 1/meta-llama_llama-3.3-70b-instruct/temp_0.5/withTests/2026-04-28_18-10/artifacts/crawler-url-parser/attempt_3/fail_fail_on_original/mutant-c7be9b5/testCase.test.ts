import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should pass for https://www.npmjs.com/package/electron-window-manager', () => {
        const url = "https://www.npmjs.com/package/electron-window-manager";
        const result = parse(url);
        expect(result.url).toBe("https://www.npmjs.com/package/electron-window-manager/");
    });
});