import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
    it("should preserve empty text when extracting URLs", () => {
        const html = `
            <html>
                <head></head>
                <body>
                    <a href="https://example.com/target"></a>
                </body>
            </html>
        `;
        const sourceUrl = "https://example.com";
        const result = extract(html, sourceUrl);
        const targetLink = result.find(link => link.url === "https://example.com/target");
        expect(targetLink).toBeDefined();
        expect(targetLink.text).not.toContain("Stryker was here!");
    });
});