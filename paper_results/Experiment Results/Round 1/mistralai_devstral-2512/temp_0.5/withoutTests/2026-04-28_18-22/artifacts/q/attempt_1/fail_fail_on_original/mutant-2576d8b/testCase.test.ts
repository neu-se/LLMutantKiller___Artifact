import { Q } from "./q";

describe("Q promise chaining with long stack traces", () => {
  it("should correctly build long stack traces when promises are chained", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    let errorInChain: Error | null = null;

    try {
      await Q.resolve()
        .then(() => {
          return Q.resolve();
        })
        .then(() => {
          return Q.resolve();
        })
        .then(() => {
          throw new Error("Test error in promise chain");
        })
        .then(() => {
          return Q.resolve();
        });
    } catch (error) {
      errorInChain = error as Error;
    }

    expect(errorInChain).not.toBeNull();
    expect(errorInChain!.message).toBe("Test error in promise chain");

    // The stack should contain multiple promise frames when long stack support is enabled
    const stack = errorInChain!.stack;
    expect(stack).toBeDefined();

    // Check that the stack contains evidence of promise chaining
    // The original code will include multiple promise frames in the stack
    // The mutated code (with `false` condition) will not include these frames
    const stackLines = stack!.split("\n");
    const promiseFrames = stackLines.filter(line =>
      line.includes("From previous event:")
    );

    // With the mutation, this will fail because no promise frames are added
    expect(promiseFrames.length).toBeGreaterThan(0);
  });
});