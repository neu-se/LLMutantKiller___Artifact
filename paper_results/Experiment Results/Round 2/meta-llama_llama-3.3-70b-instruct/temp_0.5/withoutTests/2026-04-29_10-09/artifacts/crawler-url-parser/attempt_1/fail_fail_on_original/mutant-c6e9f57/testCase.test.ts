import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should return expected result with normalize options', () => {
        const url = "https://www.npmjs.com/package/electron-window-manager?utm_source=github&utm_medium=readme&utm_campaign=electron-window-manager";
        const expected = {
            url: "https://npmjs.com/package/electron-window-manager",
            baseurl: null,
            protocol: "https:",
            host: "npmjs.com",
            domain: "npmjs",
            subdomain: "",
            path: "/package/electron-window-manager",
            search: "",
            querycount: 0
        };
        expect(parse(url)).toEqual(expected);
    });
});