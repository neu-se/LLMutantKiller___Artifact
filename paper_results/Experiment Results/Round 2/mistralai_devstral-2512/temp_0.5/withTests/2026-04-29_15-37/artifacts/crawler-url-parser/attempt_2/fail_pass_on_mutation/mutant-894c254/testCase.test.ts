// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/crawler-url-parser/attempt_1/pending_category/mutant-894c254/testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL query parameter normalization", () => {
    it("should handle URLs with UTM parameters case-insensitively", () => {
        const urlWithUTM = "http://example.com/path?UTM_SOURCE=test&ref=abc";
        const result = parse(urlWithUTM);
        expect(result).not.toBeNull();
        expect(result!.url).toContain("UTM_SOURCE=test");
    });
});