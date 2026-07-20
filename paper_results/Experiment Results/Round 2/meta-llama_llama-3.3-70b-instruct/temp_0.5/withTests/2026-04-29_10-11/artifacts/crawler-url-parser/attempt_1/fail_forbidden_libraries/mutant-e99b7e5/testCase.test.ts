import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import { JSDOM } from 'jsdom';

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
        const dom = new JSDOM(html);
        const result = extract(dom.window.document, "https://www.example.com");
        expect(result[0].text).toBe("Example");
        expect(result[1].text).toBe("");
    });
});