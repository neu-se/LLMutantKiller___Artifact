import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function test', () => {
    it('should test extract function', () => {
        const html = `
            <html>
                <body>
                    <a href="https://www.example.com">Example</a>
                    <a href="https://www.example.com/test">Test</a>
                    <a href="https://www.example2.com">Example2</a>
                </body>
            </html>
        `;
        const baseUrl = "https://www.example.com";
        const result = extract(html, baseUrl);
        expect(result.length).toBe(2);
        expect(result[0].url).toBe("https://www.example.com");
        expect(result[0].text).toBe("Example");
        expect(result[1].url).toBe("https://www.example.com/test");
        expect(result[1].text).toBe("Test");
    });
});