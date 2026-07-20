import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should parse url correctly', () => {
        const url = "https://www.npmjs.com/package/electron-window-manager#test";
        const result = parse(url);
        expect(result.url).toBe("https://www.npmjs.com/package/electron-window-manager");
        expect(result.url).not.toContain("#");
    });
});