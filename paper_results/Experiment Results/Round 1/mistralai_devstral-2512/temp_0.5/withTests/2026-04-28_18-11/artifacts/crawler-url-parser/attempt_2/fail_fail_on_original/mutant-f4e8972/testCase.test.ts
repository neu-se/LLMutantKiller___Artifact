import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with string input", () => {
    it("should handle string input correctly", () => {
        const htmlString = "<html><body><a href='http://example.com'>Test</a></body></html>";
        const result = extract(htmlString, "http://example.com");
        expect(result).toEqual([{ url: "http://example.com/", text: "Test", type: "samelevel" }]);
    });
});