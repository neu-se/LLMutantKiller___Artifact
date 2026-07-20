import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection unhandled reasons", () => {
  it("should push reason.stack to unhandledReasons when reason has a stack property", async () => {
    // Reset any existing unhandled rejections
    Q.resetUnhandledRejections();

    const error = new Error("test error");
    // Ensure the error has a stack
    expect(typeof error.stack).toBe("string");

    // Create a rejected promise - this will call trackRejection internally
    Q.reject(error);

    // Wait for async operations to complete
    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    const unhandledReasons = Q.getUnhandledReasons();

    // In original code: reason.stack is pushed (a string containing "Error: test error")
    // In mutated code: "(no stack) " + reason is pushed (since if(false) always skips the stack branch)
    expect(unhandledReasons.length).toBeGreaterThan(0);
    
    const reason = unhandledReasons[0];
    
    // The original code pushes reason.stack which contains the stack trace
    // The mutated code pushes "(no stack) Error: test error" because if(false) skips the stack branch
    expect(reason).not.toMatch(/^\(no stack\)/);
    expect(reason).toContain("Error: test error");
  });
});