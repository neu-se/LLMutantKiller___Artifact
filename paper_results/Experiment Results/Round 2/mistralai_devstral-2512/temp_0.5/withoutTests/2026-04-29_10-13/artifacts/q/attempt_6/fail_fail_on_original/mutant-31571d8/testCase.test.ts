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
        const hasPreviousEvent = stackLines.some(line => line.includes("From previous event:"));

        // In original code, this should be true (stack properly built)
        // In mutated code, this will be false (stack not properly built)
        expect(hasPreviousEvent).toBe(true);

        // Additional check: count how many times "From previous event:" appears
        const previousEventCount = stackLines.filter(line => line.includes("From previous event:")).length;

        // With 3 promises in the chain (reject + 2 then), we should have at least 2 stack separators
        expect(previousEventCount).toBeGreaterThan(1);
      } else {
        fail("Error stack should exist when long stack support is enabled");
      }
    }
  });
});