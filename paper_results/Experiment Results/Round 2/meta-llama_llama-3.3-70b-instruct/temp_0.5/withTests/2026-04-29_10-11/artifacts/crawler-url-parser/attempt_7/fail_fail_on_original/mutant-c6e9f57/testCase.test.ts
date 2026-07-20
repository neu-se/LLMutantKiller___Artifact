import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
    it('should remove fragment', () => {
        const result = parse('http://www.google.com#fragment');
        expect(result.url).toBe('http://www.google.com');
    });
});