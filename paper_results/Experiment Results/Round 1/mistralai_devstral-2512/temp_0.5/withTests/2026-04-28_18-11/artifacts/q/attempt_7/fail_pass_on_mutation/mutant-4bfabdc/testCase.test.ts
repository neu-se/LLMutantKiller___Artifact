import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should correctly filter internal frames when long stack traces are enabled", () => {
    // Access Q through the module's default export
    const Q = (qModule as any).default || qModule;

    // Enable long stack traces to trigger the filtering logic
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal stack frames
    const promise = Q.Promise((resolve, reject) => {
      // This will create internal Q frames in the stack trace
      setTimeout(() => {
        reject(new Error("Test error"));
      }, 0);
    });

    return promise
      .catch((err: Error) => {
        const stack = err.stack || "";

        // The original code should filter out internal Q frames
        // The mutated code with OR condition will keep internal frames
        // because the condition becomes more permissive
        expect(stack).not.toContain("(q.js:");

        // Restore original setting
        Q.longStackSupport = false;
      });
  });
});