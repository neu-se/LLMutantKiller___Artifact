import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with cheerio object input", () => {
    it("should handle cheerio object input correctly", () => {
        const cheerio = require("cheerio");
        const $ = cheerio.load("<html><body><a href='http://example.com'>Test</a></body></html>");
        const result = extract($, "http://example.com");
        expect(result).toEqual([{ url: "http://example.com/", text: "Test", type: "samelevel" }]);
    });
});