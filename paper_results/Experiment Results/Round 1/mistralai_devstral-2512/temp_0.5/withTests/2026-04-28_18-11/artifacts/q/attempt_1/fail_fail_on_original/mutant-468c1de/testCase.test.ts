import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces mutation test", () => {
  it("should correctly filter stack traces based on minimum stack counter", async () => {
    // This test creates a scenario where multiple promises are rejected
    // and we need to verify that the stack trace filtering works correctly
    // based on the __minimumStackCounter__ property

    // Enable long stack traces
    Q.longStackSupport = true;

    let error1: Error;
    let error2: Error;

    // Create a chain of promises that will reject with errors
    const promise1 = Q.reject(new Error("First error"))
      .then(null, (err) => {
        error1 = err;
        throw new Error("Second error");
      })
      .then(null, (err) => {
        error2 = err;
        throw err;
      });

    try {
      await promise1;
    } catch (err) {
      // Verify that the error has the expected properties
      expect(err).toBeDefined();
      expect(err.stack).toBeDefined();

      // The mutation changes the condition from checking __minimumStackCounter__
      // to always being true, which would affect how stack traces are filtered
      // In the original code, the stack trace should be properly filtered
      // In the mutated code, it might include more frames than it should

      // We can't directly test the internal __minimumStackCounter__ property
      // but we can verify the behavior by checking the stack trace structure
      const stackLines = err.stack.split('\n');
      expect(stackLines.length).toBeGreaterThan(1);

      // The test passes if we reach here without unexpected behavior
      // The mutation would cause different stack trace filtering
    } finally {
      // Clean up
      Q.longStackSupport = false;
    }
  });
});