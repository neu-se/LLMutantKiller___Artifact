import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with boolean input", () => {
    it("should handle boolean input correctly", () => {
        const booleanInput = true;
        const result = extract(booleanInput as any, "http://example.com");
        expect(result).toEqual([]);
    });
});