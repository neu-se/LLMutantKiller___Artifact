import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('debugger test', () => {
    it('should parse URL without debugger interruption', () => {
        // The original code has a debugger statement that would pause execution
        // The mutated code removes it, so this test will pass
        const url = "https://www.npmjs.com/package/electron-window-manager";
        const result = parse(url);
        expect(result).not.toBeNull();
        expect(result?.url).toBe(url);
        expect(result?.protocol).toBe("https:");
        expect(result?.host).toBe("www.npmjs.com");
        expect(result?.path).toBe("/package/electron-window-manager");
    });
});