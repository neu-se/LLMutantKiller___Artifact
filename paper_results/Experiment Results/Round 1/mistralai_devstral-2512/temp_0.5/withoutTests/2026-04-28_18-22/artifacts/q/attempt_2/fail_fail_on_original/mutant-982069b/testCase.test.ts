// testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should filter out internal and node frames from stack traces", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));
    return promise
      .then(() => {
        throw new Error("Should not reach here");
      })
      .catch((error: Error) => {
        // The stack trace should be filtered
        expect(error.stack).toBeDefined();
        // The filtered stack should not contain internal Q frames
        expect(error.stack?.includes("filterStackString")).toBe(false);
        // The filtered stack should not contain node.js internal frames
        expect(error.stack?.includes("(module.js:")).toBe(false);
        expect(error.stack?.includes("(node.js:")).toBe(false);
      });
  });
});