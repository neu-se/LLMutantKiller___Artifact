import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("reports unhandled rejections correctly when a rejection is created and then handled", () => {
    Q.resetUnhandledRejections();

    const error = new Error("test rejection");
    const rejected = Q.reject(error);

    // The rejection should be tracked immediately
    const reasons = Q.getUnhandledReasons();
    expect(reasons).toEqual([error.stack]);

    // After handling the rejection, it should be untracked
    return rejected.fail(function () {
      // handle it
    }).fin(function () {
      expect(Q.getUnhandledReasons().length).toEqual(0);
    });
  });
});