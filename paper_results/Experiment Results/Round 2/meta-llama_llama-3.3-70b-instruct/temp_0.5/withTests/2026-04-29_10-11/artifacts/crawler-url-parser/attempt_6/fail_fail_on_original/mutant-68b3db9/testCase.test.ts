import { extract } from '../../crawler-url-parser.js';

describe('extract function', () => {
    it('should pass when trim() is used and fail when it is not', () => {
        const html = '<a href="http://example.com">   test-link   </a>';
        const baseUrl = 'http://example.com';
        const result = extract(html, baseUrl);
        const text = result.find((el: any) => el.url === 'http://example.com')?.text;
        expect(text).toBe('test-link');
    });
});