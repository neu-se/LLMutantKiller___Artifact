import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection reporting", () => {
  it("reports the stack trace of an Error reason when rejecting with an Error object", () => {
    Q.resetUnhandledRejections();
    
    const error = new Error("test error for stack trace");
    Q.reject(error);
    
    const reasons = Q.getUnhandledReasons();
    expect(reasons).toEqual([error.stack]);
  });
});