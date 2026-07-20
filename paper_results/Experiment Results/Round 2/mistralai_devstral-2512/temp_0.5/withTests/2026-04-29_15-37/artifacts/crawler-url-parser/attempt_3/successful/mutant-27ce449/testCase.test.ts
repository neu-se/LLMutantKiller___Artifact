import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function behavior with invalid URLs", () => {
    it("should not include URLs that fail parsing when currentUrl is null", () => {
        const html = `
            <html>
                <body>
                    <a href="invalid://url">Invalid Protocol</a>
                    <a href="http://valid.com">Valid Link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://base.com");
        const invalidUrls = result.filter(url => url.url === null || url.url === undefined);
        expect(invalidUrls.length).toBe(0);
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://valid.com/");
    });
});