import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking with Error stack traces", () => {
  it("should report the stack trace when rejecting with an Error object that has a stack property", () => {
    Q.resetUnhandledRejections();

    const error = new Error("test rejection reason");

    // Ensure the error has a stack property
    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe("string");

    Q.reject(error);

    const unhandledReasons = Q.getUnhandledReasons();

    // In the original code, when reason has a stack, it pushes reason.stack
    // In the mutated code (if (false)), it always pushes "(no stack) " + reason
    expect(unhandledReasons).toHaveLength(1);
    expect(unhandledReasons[0]).toBe(error.stack);
    expect(unhandledReasons[0]).not.toMatch(/^\(no stack\)/);
  });
});