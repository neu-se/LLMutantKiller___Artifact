import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL containing fragment", () => {
    it("should correctly handle base URLs with fragments by removing them", () => {
        const currentUrl = "page.html";
        const baseUrl = "http://example.com/path/#fragment";
        const result = parse(currentUrl, baseUrl);

        expect(result).not.toBeNull();
        expect(result?.url).toBe("http://example.com/path/page.html");
        expect(result?.baseurl).toBe("http://example.com/path/");
    });
});