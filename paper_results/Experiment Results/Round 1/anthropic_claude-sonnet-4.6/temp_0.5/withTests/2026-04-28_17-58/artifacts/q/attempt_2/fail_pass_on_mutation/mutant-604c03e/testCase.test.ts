import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not throw when handling a rejected promise that was not tracked", () => {
    Q.resetUnhandledRejections();

    // Create a rejection and handle it - this triggers untrackRejection
    // In the mutated code, `at` is never declared but used in splice calls,
    // causing a ReferenceError when the early-return guard is bypassed
    const error = new Error("test error");
    const rejection = Q.reject(error);

    // Attach a handler - this calls untrackRejection internally
    return rejection.fail(function () {
      return "handled";
    }).then(function (result: string) {
      expect(result).toBe("handled");
      // Verify no errors occurred and unhandled reasons reflects correct state
      const reasons = Q.getUnhandledReasons();
      expect(Array.isArray(reasons)).toBe(true);
    });
  });
});