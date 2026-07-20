import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('debugger test', () => {
    it('should not hit debugger when parsing URL with space', () => {
        // The original code has a debugger statement that will be hit
        // The mutated code removes it, so this test will pass
        const url = "https ://www.npmjs.com/package/electron-window-manager";
        const result = parse(url);
        expect(result).toBeNull();
    });
});