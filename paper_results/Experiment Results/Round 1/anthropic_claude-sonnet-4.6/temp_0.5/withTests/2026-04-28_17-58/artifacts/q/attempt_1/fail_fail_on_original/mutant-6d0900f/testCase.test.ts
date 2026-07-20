import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking - untrackRejection behavior", () => {
  it("should keep rejection in unhandled reasons after handling when tracking is enabled", () => {
    Q.resetUnhandledRejections();

    // Create a rejection and handle it via .fail()
    // With original code: untrackRejection does nothing when trackUnhandledRejections=true
    // With mutated code: untrackRejection always executes its body (if true)
    // The key: after handling a rejection, check if it was removed from unhandled reasons
    const error = new Error("test error");
    const rejected = Q.reject(error);

    // Handle the rejection - this calls untrackRejection internally
    const handled = rejected.fail(function () {
      return "handled";
    });

    // With original: untrackRejection is a no-op when tracking enabled, so rejection stays
    // With mutation: if (true) { } still empty body, so no difference...
    // Let's verify the rejection was tracked initially
    expect(Q.getUnhandledReasons()).toEqual([error.stack]);

    return handled.then(function () {
      // After handling, original keeps it in unhandled (untrackRejection is no-op)
      // mutation with if(true){} - body is empty so same behavior
      // Actually both should be same since body is empty
      // The real test: unhandled reasons should contain the error
      expect(Q.getUnhandledReasons()).toEqual([error.stack]);
    });
  });
});