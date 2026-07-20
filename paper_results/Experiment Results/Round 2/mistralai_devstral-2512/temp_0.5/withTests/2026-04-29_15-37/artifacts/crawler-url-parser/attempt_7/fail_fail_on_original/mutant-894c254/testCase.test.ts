// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/crawler-url-parser/attempt_1/pending_category/mutant-894c254/testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL query parameter normalization", () => {
    it("should remove lowercase UTM parameters but preserve uppercase ones", () => {
        const urlWithUTM = "http://example.com/path?utm_source=test&UTM_SOURCE=test2&ref=abc";
        const result = parse(urlWithUTM);
        expect(result).not.toBeNull();
        expect(result!.url).not.toContain("utm_source=test");
        expect(result!.url).toContain("UTM_SOURCE=test2");
    });
});