import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with cheerio object", () => {
    it("should process cheerio object correctly when passed directly", () => {
        const cheerio = require("cheerio");
        const $ = cheerio.load("<html><body><a href='http://example.com/test'>Link</a></body></html>");
        const result = extract($, "http://example.com");
        expect(result.length).toBe(1);
        expect(result[0].url).toBe("http://example.com/test");
    });
});