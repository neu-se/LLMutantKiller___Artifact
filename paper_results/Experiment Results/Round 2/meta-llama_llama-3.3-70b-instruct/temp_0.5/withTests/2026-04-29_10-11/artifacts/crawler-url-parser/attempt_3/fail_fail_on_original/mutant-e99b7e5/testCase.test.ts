import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should return the correct text for the anchor tags', () => {
        const html = `
            <html>
                <body>
                    <a href="https://www.example.com">Example</a>
                    <a href="https://www.example2.com">Example2</a>
                </body>
            </html>
        `;
        const result = extract(html, "https://www.example.com");
        expect(result[0].text).toBe("Example");
        expect(result[1].text).toBe("Example2");
    });
});