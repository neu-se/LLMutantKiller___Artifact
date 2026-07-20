import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with undefined href", () => {
    it("should not include links with undefined href in the result", () => {
        const html = `
            <html>
                <body>
                    <a href="http://example.com">Valid Link</a>
                    <a href="javascript:void(0)">JavaScript Link</a>
                    <a href="mailto:test@example.com">Mailto Link</a>
                    <a href="ftp://example.com">FTP Link</a>
                    <a href="ab">Short Link</a>
                    <a href="abc">Short Link</a>
                </body>
            </html>
        `;
        const result = extract(html, "http://example.com");
        const validLinks = result.filter(link => link.url.includes("example.com"));
        expect(validLinks.length).toBe(1);
        expect(validLinks[0].url).toBe("http://example.com/");
        expect(validLinks[0].text).toBe("Valid Link");
    });
});