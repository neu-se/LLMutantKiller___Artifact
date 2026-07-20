import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking with stack traces", () => {
  it("should store the error stack when rejecting with an Error that has a stack property", () => {
    Q.resetUnhandledRejections();

    const error = new Error("test rejection with stack");
    Q.reject(error);

    const reasons = Q.getUnhandledReasons();
    expect(reasons).toEqual([error.stack]);
  });
});