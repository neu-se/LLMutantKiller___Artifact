import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', function () {
    it('should have a side effect when run directly', function () {
        const originalConsoleLog = console.log;
        console.log = jest.fn();
        const originalCode = `
            let url = "https ://www.npmjs.com/package/electron-window-manager";
            let res = parse(url);
        `;
        eval(originalCode);
        expect(console.log).toHaveBeenCalledTimes(0);
        console.log = originalConsoleLog;
    });
});