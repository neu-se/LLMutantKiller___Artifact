import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should extract urls correctly', () => {
        const html = `
            <html>
                <body>
                    <a href="https://www.example.com">Example</a>
                    <a href="https://www.example2.com">Example 2</a>
                    <a href="javascript:void(0)">JavaScript Link</a>
                    <a href="mailto:example@example.com">Mailto Link</a>
                    <a href="ftp://example.com">FTP Link</a>
                </body>
            </html>
        `;
        const baseUrl = 'https://www.baseurl.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(2);
        expect(result[0].url).toBe('https://www.example.com/');
        expect(result[1].url).toBe('https://www.example2.com/');
    });

    it('should filter out short urls', () => {
        const html = `
            <html>
                <body>
                    <a href="a">Short URL</a>
                </body>
            </html>
        `;
        const baseUrl = 'https://www.baseurl.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(0);
    });
});