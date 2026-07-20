// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-f52bdbd/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should track rejection reasons with stack traces", () => {
    const error = new Error("test error");
    error.stack = "Error: test error\n    at testCase.test.ts:10:15";
    
    Q.reject(error);
    
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(1);
    expect(reasons[0]).toBe(error.stack);
  });
});