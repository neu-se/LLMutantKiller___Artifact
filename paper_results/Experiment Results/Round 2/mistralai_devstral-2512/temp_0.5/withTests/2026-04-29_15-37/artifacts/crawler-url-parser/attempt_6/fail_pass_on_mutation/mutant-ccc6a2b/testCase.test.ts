import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('debugger test', () => {
    it('should parse URL without hitting debugger statement', () => {
        // This test verifies the module can be loaded and used without hitting debugger
        // The original code has a debugger statement that would pause execution
        // The mutated code removes it, so this test should pass
        const url = "https://www.npmjs.com/package/electron-window-manager";
        const result = parse(url);
        expect(result).not.toBeNull();
        expect(result?.url).toBe("https://www.npmjs.com/package/electron-window-manager");
        expect(result?.protocol).toBe("https:");
        expect(result?.host).toBe("www.npmjs.com");
    });
});