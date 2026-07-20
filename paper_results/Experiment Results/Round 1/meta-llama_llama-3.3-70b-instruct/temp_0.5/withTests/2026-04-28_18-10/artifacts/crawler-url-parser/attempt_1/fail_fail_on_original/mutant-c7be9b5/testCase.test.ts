import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should pass for https://www.npmjs.com/package/electron-window-manager', () => {
        const html = '<html><body><a href="https://www.npmjs.com/package/electron-window-manager">test-link</a></body></html>';
        const result = extract(html, "https://www.npmjs.com/package/electron-window-manager");
        expect(result.length).toBe(1);
    });
});