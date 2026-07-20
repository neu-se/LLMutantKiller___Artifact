import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with href containing only spaces', () => {
    it('should process href with only spaces correctly', () => {
        const html = `
            <html>
                <body>
                    <a href="   ">Link with spaces</a>
                </body>
            </html>
        `;
        const baseUrl = "http://example.com";
        const result = extract(html, baseUrl);

        // The original code checks typeof href == "undefined" which is false for string with spaces
        // The mutated code checks typeof href == "" which is false for string with spaces
        // Both will process it, but we need to verify the behavior is consistent
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com/");
    });
});