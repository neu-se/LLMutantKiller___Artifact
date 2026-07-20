import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should detect the mutation', () => {
        const html = '<a href="http://example.com">Link Text</a>';
        const baseUrl = 'http://example.com';
        const result = extract(html, baseUrl);
        if (result && result.length > 0) {
            expect(result[0].text).not.toBe("");
            expect(result[0].text).toBeDefined();
            expect(result[0].text).not.toBeNull();
            expect(result[0].text).toBeTruthy();
        }
    });
});