import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking with Error objects", () => {
  it("should store the error stack trace (not the no-stack fallback) when rejecting with an Error that has a stack", () => {
    Q.resetUnhandledRejections();

    const error = new Error("test rejection reason");
    // Ensure the error has a stack property
    expect(typeof error.stack).toBe("string");

    Q.reject(error);

    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(1);
    // In the original code: reason.stack !== "undefined" is true for Error objects,
    // so it pushes reason.stack (the actual stack trace string)
    // In the mutated code: reason.stack === "undefined" is false for Error objects,
    // so it falls through to push "(no stack) " + reason instead
    expect(reasons[0]).toBe(error.stack);
    expect(reasons[0]).not.toMatch(/^\(no stack\)/);
  });
});