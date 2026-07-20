import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('module parent test', () => {
    it('should correctly parse URL when module is loaded as dependency', () => {
        const result = parse("https://www.npmjs.com/package/electron-window-manager");
        expect(result).not.toBeNull();
        expect(result?.protocol).toBe("https:");
        expect(result?.host).toBe("www.npmjs.com");
        expect(result?.path).toBe("/package/electron-window-manager");
    });
});