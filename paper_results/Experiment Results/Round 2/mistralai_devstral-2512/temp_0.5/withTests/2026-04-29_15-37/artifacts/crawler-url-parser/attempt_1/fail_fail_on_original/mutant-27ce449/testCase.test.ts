import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function behavior with invalid URLs", () => {
    it("should not include URLs that fail parsing in the result", () => {
        const html = `
            <html>
                <body>
                    <a href="invalid-url">Link 1</a>
                    <a href="http://valid.com">Link 2</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://base.com");
        const invalidUrls = result.filter(url => url.url === null || !url.url);
        expect(invalidUrls.length).toBe(0);
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://valid.com/");
    });
});