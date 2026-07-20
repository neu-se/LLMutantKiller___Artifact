import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('debugger test', () => {
    it('should not pause execution when parsing specific URL', () => {
        // The original code has a debugger statement that pauses execution
        // The mutated code removes it, so execution continues normally
        // We test this by checking if the function returns in reasonable time
        const url = "https ://www.npmjs.com/package/electron-window-manager";
        const start = Date.now();
        const result = parse(url);
        const duration = Date.now() - start;

        // If debugger was hit, execution would pause and take much longer
        // The mutated version should complete quickly
        expect(duration).toBeLessThan(50);
        expect(result).toBeNull();
    });
});