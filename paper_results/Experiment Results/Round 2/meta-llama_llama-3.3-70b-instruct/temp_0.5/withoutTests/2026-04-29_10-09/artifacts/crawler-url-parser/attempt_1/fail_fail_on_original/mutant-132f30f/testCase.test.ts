import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
    it('should strip WWW from the domain', () => {
        const url = "http://www.npmjs.com/package/electron-window-manager";
        const parsedUrl = parse(url);
        expect(parsedUrl.domain).toBe('npmjs.com');
    });
});