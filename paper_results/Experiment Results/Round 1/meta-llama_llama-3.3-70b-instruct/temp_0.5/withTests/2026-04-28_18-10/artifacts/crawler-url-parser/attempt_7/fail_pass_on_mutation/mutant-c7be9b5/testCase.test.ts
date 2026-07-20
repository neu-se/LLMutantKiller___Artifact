import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should pass for https://www.npmjs.com/package/electron-window-manager', () => {
        const url = "https://www.npmjs.com/package/electron-window-manager";
        const result = parse(url);
        expect(result).not.toBeNull();
        expect(result.url).not.toBeUndefined();
        expect(result.url).toContain("https");
        const consoleLogSpy = jest.spyOn(console, 'log');
        expect(consoleLogSpy).toHaveBeenCalledTimes(0);
    });
});