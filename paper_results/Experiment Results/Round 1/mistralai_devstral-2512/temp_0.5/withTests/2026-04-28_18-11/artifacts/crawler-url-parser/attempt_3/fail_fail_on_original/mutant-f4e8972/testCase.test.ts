import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function behavior with different input types", () => {
    it("should handle non-string input by not processing links", () => {
        const nonStringInput = { some: "object" };
        const result = extract(nonStringInput as any, "http://example.com");
        expect(result).toEqual([]);
    });
});