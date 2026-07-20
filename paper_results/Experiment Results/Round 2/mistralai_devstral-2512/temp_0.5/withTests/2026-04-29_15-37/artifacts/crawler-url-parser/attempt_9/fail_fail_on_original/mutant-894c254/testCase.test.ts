// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/crawler-url-parser/attempt_1/pending_category/mutant-894c254/testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL query parameter normalization", () => {
    it("should remove UTM parameters with case-insensitive regex pattern", () => {
        const urlWithUTM = "http://example.com/path?UTM_SOURCE=test&utm_medium=email&UTM_CAMPAIGN=ad&ref=abc";
        const result = parse(urlWithUTM);
        expect(result).not.toBeNull();
        expect(result!.url).toBe("http://example.com/path?ref=abc");
    });
});