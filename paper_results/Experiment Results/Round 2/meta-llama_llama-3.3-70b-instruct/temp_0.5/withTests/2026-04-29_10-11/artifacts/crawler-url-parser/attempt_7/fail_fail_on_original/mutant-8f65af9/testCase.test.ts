import { extract } from '../../crawler-url-parser.js';

describe('extract function test', () => {
    it('should test extract function', () => {
        const htmlString = `
            <html>
                <body>
                    <a href="http://www.stackoverflow.com/internal-1">test-link-1</a><br />
                    <a href="http://www.stackoverflow.com/internal-2">test-link-2</a><br />
                    <a href="http://www.stackoverflow.com/internal-2">test-link-3</a><br />
                    <a href="http://faq.stackoverflow.com/subdomain-1">test-link-4</a><br />
                    <a href="http://faq.stackoverflow.com/subdomain-2">test-link-5</a><br />
                    <a href="http://faq.stackoverflow.com/subdomain-2">test-link-6</a><br />
                    <a href="http://www.google.com/external-1">test-link-7</a><br />
                    <a href="http://www.google.com/external-2">test-link-8</a><br />
                    <a href="http://www.google.com/external-2">test-link-9</a><br />
                </body>
            </html>
        `;
        const baseUrl = "http://www.stackoverflow.com/aaa/bbb/ccc";
        const result = extract(htmlString, baseUrl);
        expect(result.length).toBe(9);
        expect(result[0].text).not.toBe(false);
    });
});