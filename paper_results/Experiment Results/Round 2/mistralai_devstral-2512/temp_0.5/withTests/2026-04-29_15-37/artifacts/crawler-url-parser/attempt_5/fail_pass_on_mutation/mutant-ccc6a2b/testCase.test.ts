import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('debugger test', () => {
    it('should handle URL with space after protocol without debugger interruption', () => {
        // The original code has a debugger that will pause execution
        // The mutated code removes the debugger, allowing normal execution
        const url = "https ://www.npmjs.com/package/electron-window-manager";
        const startTime = Date.now();
        const result = parse(url);
        const endTime = Date.now();
        // If debugger was hit, execution would pause and take much longer
        expect(endTime - startTime).toBeLessThan(100);
        expect(result).toBeNull();
    });
});