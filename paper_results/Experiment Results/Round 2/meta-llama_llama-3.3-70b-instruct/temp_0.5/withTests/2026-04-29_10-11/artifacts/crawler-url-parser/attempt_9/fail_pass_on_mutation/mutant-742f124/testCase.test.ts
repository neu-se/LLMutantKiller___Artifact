import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should parse url correctly', () => {
        const url = "https://www.npmjs.com/package/electron-window-manager#test";
        const result = parse(url);
        const expectedUrl = "https://www.npmjs.com/package/electron-window-manager";
        expect(result.url).toBe(expectedUrl);
        expect(url.length).toBeGreaterThan(result.url.length);
    });
});