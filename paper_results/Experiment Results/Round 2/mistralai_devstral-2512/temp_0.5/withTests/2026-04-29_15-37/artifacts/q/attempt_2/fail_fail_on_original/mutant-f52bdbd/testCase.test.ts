import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should track unhandled rejections with stack traces", () => {
    const originalQ = Q;
    originalQ.resetUnhandledRejections();
    const error = new Error("test error");
    error.stack = "Error: test error\n    at testCase.test.ts:5:15";
    originalQ.reject(error);
    const reasons = originalQ.getUnhandledReasons();
    expect(reasons.length).toBe(1);
    expect(reasons[0]).toContain("Error: test error");
    expect(reasons[0]).toContain("testCase.test.ts:5:15");
  });
});