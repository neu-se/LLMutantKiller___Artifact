import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection stores correct reason in unhandledReasons", () => {
  it("should store the stack trace string when rejection reason has a stack property", async () => {
    // Reset any existing unhandled rejections
    Q.resetUnhandledRejections();

    const error = new Error("test rejection error");
    // Ensure the error has a stack property
    expect(typeof error.stack).toBe("string");

    // Create a rejected promise - this triggers trackRejection internally
    Q.reject(error);

    // Wait for async operations to settle
    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    const unhandledReasons = Q.getUnhandledReasons();

    // With original code: reason.stack !== "undefined" is true when stack exists,
    // so unhandledReasons[0] should be the stack string (not prefixed with "(no stack)")
    // With mutated code: reason.stack === "undefined" is false when stack exists,
    // so it falls to else branch and stores "(no stack) " + reason
    expect(unhandledReasons.length).toBeGreaterThan(0);
    
    const storedReason = unhandledReasons[0];
    
    // Original: stores error.stack (a string containing stack trace info)
    // Mutated: stores "(no stack) Error: test rejection error"
    expect(storedReason).not.toMatch(/^\(no stack\)/);
    expect(storedReason).toBe(error.stack);
  });
});