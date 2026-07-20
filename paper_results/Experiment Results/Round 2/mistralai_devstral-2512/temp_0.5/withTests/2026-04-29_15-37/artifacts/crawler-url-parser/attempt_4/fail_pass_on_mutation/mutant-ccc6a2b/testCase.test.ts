import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('debugger test', () => {
    it('should parse URL with space after protocol', () => {
        // The original code has a debugger statement that will be hit when parsing this specific URL
        // The mutated code removes the debugger, so it will return null (invalid URL)
        const url = "https ://www.npmjs.com/package/electron-window-manager";
        const result = parse(url);
        expect(result).toBeNull();
    });
});