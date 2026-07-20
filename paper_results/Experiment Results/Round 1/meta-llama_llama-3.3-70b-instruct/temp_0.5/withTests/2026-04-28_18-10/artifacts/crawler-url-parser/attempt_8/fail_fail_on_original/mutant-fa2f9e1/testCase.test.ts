import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should detect the mutation', () => {
        const html = '<a href="http://example.com">Link Text</a>';
        const baseUrl = 'http://example.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com");
        expect(result[0].text).not.toBe("");
    });
});