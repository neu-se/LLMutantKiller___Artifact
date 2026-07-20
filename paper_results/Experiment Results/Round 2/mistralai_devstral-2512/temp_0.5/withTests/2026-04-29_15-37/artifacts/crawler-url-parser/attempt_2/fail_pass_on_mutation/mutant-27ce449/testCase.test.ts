import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function behavior with null URLs", () => {
    it("should handle null URLs correctly when parsing fails", () => {
        const html = `
            <html>
                <body>
                    <a href="javascript:void(0)">Invalid Link</a>
                    <a href="http://valid.com">Valid Link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://base.com");
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://valid.com/");
    });
});