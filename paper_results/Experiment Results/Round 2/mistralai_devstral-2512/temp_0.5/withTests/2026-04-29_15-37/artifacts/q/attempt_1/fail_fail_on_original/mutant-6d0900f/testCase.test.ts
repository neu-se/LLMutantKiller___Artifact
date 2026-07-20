// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-6d0900f/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should track unhandled rejections when trackUnhandledRejections is true", async () => {
    Q.resetUnhandledRejections();
    Q.reject("test reason");
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBeGreaterThan(0);
    expect(reasons[0]).toContain("test reason");
  });
});