import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should remove fragments from URLs', () => {
        const url = 'https://www.example.com/path#fragment';
        const result = parse(url);
        expect(result.url).not.toContain('#fragment');
    });
});