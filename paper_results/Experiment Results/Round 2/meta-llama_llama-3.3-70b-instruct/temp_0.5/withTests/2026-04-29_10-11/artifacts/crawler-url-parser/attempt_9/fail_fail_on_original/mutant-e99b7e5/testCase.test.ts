import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should return the correct text for the anchor tags', () => {
        const html = `
            <html>
                <body>
                    <a href="https://www.example.com">Example</a>
                    <a href="https://www.example2.com"></a>
                </body>
            </html>
        `;
        const result = extract(html, "https://www.example.com");
        expect(result.find(r => r.url === "https://www.example.com").text).toBe("Example");
        expect(result.find(r => r.url === "https://www.example2.com").text).not.toBe("Stryker was here!");
    });
});