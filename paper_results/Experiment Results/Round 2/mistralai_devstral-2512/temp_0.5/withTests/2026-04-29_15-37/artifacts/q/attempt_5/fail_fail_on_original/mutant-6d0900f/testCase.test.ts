// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_5/pending_category/mutant-6d0900f/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should track rejections when trackUnhandledRejections is true and stop when set to false", () => {
    Q.resetUnhandledRejections();
    Q.reject("first reason");
    expect(Q.getUnhandledReasons().length).toBeGreaterThan(0);

    Q.stopUnhandledRejectionTracking();
    Q.reject("second reason");
    expect(Q.getUnhandledReasons().length).toBe(1);
  });
});