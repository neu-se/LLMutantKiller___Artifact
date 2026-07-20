import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with undefined href", () => {
    it("should not include links with undefined href in the result", () => {
        const html = `
            <html>
                <body>
                    <a href="http://example.com">Valid Link</a>
                    <a href="abcd">Short Link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        expect(result.length).toBe(2);
        expect(result[0].url).toBe("http://example.com/");
        expect(result[0].text).toBe("Valid Link");
        expect(result[1].url).toBe("http://example.com/abcd");
        expect(result[1].text).toBe("Short Link");
    });
});