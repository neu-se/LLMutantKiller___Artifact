const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise error stack handling", () => {
  it("should correctly build long stack traces with multiple promise rejections", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises that will be rejected
    const error = new Error("Test error");
    const promiseChain = Q.reject(error)
      .then(() => { throw new Error("Should not reach here"); })
      .then(() => { throw new Error("Should not reach here"); });

    try {
      await promiseChain;
      fail("Promise should have rejected");
    } catch (e: any) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe("Test error");

      // The mutation breaks stack trace building by making the condition always false
      // This means the stack won't contain the expected concatenated traces
      if (e.stack) {
        const stackLines = e.stack.split('\n');
        const hasPreviousEvent = stackLines.some((line: string) => line.includes("From previous event:"));

        // In original code, this should be true (stack properly built)
        // In mutated code, this will be false (stack not properly built)
        expect(hasPreviousEvent).toBe(true);

        // Additional check: verify the error has the expected stack counter property
        // The mutation breaks the logic that sets this property
        expect(e.__minimumStackCounter__).toBeDefined();
        expect(typeof e.__minimumStackCounter__).toBe('number');
        expect(e.__minimumStackCounter__).toBeGreaterThan(0);

        // Check that the stack counter is set to the minimum value from the promise chain
        // The mutation breaks this logic by always evaluating to false
        expect(e.__minimumStackCounter__).toBeLessThanOrEqual(2);
      } else {
        fail("Error stack should exist when long stack support is enabled");
      }
    }
  });
});