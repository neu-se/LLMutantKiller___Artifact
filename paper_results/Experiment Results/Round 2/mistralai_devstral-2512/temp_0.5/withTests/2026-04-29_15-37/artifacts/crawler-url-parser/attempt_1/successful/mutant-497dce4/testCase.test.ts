// test/mutant-497dce4.test.ts

import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with duplicate URLs', () => {
    it('should merge text for duplicate URLs', () => {
        const html = `
            <html>
                <body>
                    <a href="http://example.com/page1">First Link</a>
                    <a href="http://example.com/page1">Second Link</a>
                    <a href="http://example.com/page2">Third Link</a>
                </body>
            </html>
        `;

        const result = extract(html, "http://example.com");

        const page1Links = result.filter(link => link.url === "http://example.com/page1");
        expect(page1Links.length).toBe(1);
        expect(page1Links[0].text).toBe("First Link Second Link");
    });
});