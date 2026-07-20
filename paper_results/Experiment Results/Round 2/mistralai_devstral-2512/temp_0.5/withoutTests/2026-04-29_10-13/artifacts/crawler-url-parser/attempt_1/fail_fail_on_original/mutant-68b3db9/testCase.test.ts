import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import * as cheerio from "cheerio";

describe("extract function", () => {
    it("should trim whitespace from link text", () => {
        const html = `
            <html>
                <body>
                    <a href="https://example.com">  Test Link  </a>
                </body>
            </html>
        `;
        const sourceUrl = "https://example.com";
        const result = extract(html, sourceUrl);
        expect(result[0].text).toBe("Test Link");
    });
});