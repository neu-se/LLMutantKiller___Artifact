import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should remove a rejection from unhandledReasons once it has been handled", () => {
    Q.resetUnhandledRejections();

    const error = new Error("test rejection");
    const rejected = Q.reject(error);

    // Rejection should be tracked immediately
    expect(Q.getUnhandledReasons()).toEqual([error.stack]);

    // Handle the rejection - this should trigger untrackRejection
    return rejected.fail(function () {
      return "recovered";
    }).then(function () {
      // Original: untrackRejection removes the rejection (guard only skips when tracking disabled)
      // Mutated: if(true) always returns early, never removes → rejection stays in list
      expect(Q.getUnhandledReasons()).toEqual([]);
    });
  });
});