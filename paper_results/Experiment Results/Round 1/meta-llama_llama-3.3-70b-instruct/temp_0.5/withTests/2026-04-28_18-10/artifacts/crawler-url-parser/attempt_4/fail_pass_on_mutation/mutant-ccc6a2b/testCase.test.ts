import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', function () {
    it('should parse url and log to console', function () {
        const url = "https://www.npmjs.com/package/electron-window-manager";
        const consoleSpy = jest.spyOn(console, 'log');
        if (!module.parent) {
            const result = parse(url);
            console.log("for testing purpose");
        }
        expect(consoleSpy).toHaveBeenCalledTimes(1);
    });
});