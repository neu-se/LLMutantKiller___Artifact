import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should return expected result with normalize options', () => {
        const url = "https://www.npmjs.com/package/electron-window-manager?utm_source=github&utm_medium=readme&utm_campaign=electron-window-manager";
        const result = parse(url);
        if (result!== null) {
            expect(result.url).not.toContain("?");
        }
    });
});