// test case
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should pass for https://www.npmjs.com/package/electron-window-manager', () => {
        const consoleLogSpy = jest.spyOn(console, 'log');
        const url = "https://www.npmjs.com/package/electron-window-manager";
        const result = parse(url);
        expect(result).not.toBeNull();
        expect(result.url).not.toBeUndefined();
        expect(result.url).toContain("https");
        expect(consoleLogSpy).toHaveBeenCalledTimes(0);
        console.log('for testing purpose');
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    });
});