import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function test', () => {
    it('should test extract function', () => {
        const html = `
            <html>
                <body>
                    <a href="https://www.example.com">Example</a>
                    <a href="https://www.example.com"></a>
                </body>
            </html>
        `;
        const baseUrl = "https://www.example.com";
        const result = extract(html, baseUrl);
        expect(result.length).toBe(1);
        expect(result[0].text).toBe("Example ");
    });
});