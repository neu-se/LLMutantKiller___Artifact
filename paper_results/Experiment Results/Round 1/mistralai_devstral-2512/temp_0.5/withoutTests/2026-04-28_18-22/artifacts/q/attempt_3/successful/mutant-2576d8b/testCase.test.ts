import * as qModule from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q promise long stack trace support", () => {
  it("should build long stack traces when chaining rejected promises with longStackSupport enabled", async () => {
    // Get the Q object from the module
    const Q = qModule.default || qModule;

    // Enable long stack traces
    Q.longStackSupport = true;

    let caughtError: Error | null = null;

    try {
      await Q.reject(new Error("Initial error"))
        .then(() => {
          return Q.resolve("should not reach here");
        })
        .then(() => {
          return Q.resolve("should not reach here either");
        });
    } catch (error) {
      caughtError = error as Error;
    }

    expect(caughtError).not.toBeNull();
    expect(caughtError!.message).toBe("Initial error");

    // The key test: with long stack support enabled, the stack should contain
    // "From previous event:" markers showing the promise chain
    const stack = caughtError!.stack;
    expect(stack).toBeDefined();

    // The mutated code won't add these markers because the loop condition is always false
    const hasPreviousEventMarker = stack!.includes("From previous event:");
    expect(hasPreviousEventMarker).toBe(true);
  });
});