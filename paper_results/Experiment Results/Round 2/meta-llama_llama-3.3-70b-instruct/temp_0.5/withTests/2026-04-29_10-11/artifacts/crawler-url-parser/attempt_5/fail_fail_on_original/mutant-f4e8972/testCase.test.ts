import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should parse url correctly', () => {
        const htmlString = '<html><body><a href="https://www.example.com">Example</a></body></html>';
        const result = extract(htmlString, 'https://www.example.com');
        expect(result).toBeDefined();
        expect(result.length).toBe(1);
        expect(typeof result[0]).toBe('object');
        expect(result[0]).toHaveProperty('text');
    });
});