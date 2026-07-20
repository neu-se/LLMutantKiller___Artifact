// testCase.test.ts

import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function text trimming', () => {
    it('should trim whitespace from link text', () => {
        const html = `
            <html>
                <body>
                    <a href="http://example.com">  Test Link  </a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        expect(result[0].text).toBe("Test Link");
    });
});