import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', function () {
    it('should parse url and have a debugger statement', function () {
        const url = "https://www.npmjs.com/package/electron-window-manager";
        const originalCode = `
            let url = "https://www.npmjs.com/package/electron-window-manager";
            let res = parse(url);
            debugger;
        `;
        const mutatedCode = `
            let url = "https://www.npmjs.com/package/electron-window-manager";
            let res = parse(url);
        `;
        const originalResult = eval(originalCode);
        const mutatedResult = eval(mutatedCode);
        expect(originalCode.includes('debugger')).toBe(true);
        expect(mutatedCode.includes('debugger')).toBe(false);
    });
});