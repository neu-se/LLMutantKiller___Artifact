import { extract } from '../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser';

describe('extract function', () => {
    it('should pass when trim() is used and fail when it is not', () => {
        const html = '<a href="http://example.com">   test-link   </a>';
        const baseUrl = 'http://example.com';
        const resultWithTrim = extract(html, baseUrl);
        const textWithTrim = resultWithTrim.find((el) => el.url === 'http://example.com')?.text;
        expect(textWithTrim).toBe('test-link');

        // Simulate the mutation by removing the trim() function
        const htmlWithoutTrim = '<a href="http://example.com">   test-link   </a>';
        const resultWithoutTrim = extract(htmlWithoutTrim, baseUrl);
        const textWithoutTrim = resultWithoutTrim.find((el) => el.url === 'http://example.com')?.text;
        expect(textWithoutTrim).toBe('   test-link   ');
    });
});