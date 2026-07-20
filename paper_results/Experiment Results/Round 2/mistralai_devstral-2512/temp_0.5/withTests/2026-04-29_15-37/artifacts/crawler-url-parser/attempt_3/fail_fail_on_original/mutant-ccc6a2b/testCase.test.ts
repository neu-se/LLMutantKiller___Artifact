import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('debugger test', () => {
    it('should not hit debugger statement when parsing URL', () => {
        // This test will fail in the original code because it will hit the debugger statement
        // and pause execution, causing the test to timeout or fail to complete
        // The mutated code removes the debugger statement, so it will pass
        const url = "https ://www.npmjs.com/package/electron-window-manager";
        const result = parse(url);
        expect(result).not.toBeNull();
        expect(result?.url).toBe("https://www.npmjs.com/package/electron-window-manager");
    });
});