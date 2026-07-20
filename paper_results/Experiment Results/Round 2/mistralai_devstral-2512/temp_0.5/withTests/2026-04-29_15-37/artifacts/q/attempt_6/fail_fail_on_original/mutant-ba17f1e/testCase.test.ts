import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
  it("should correctly parse stack traces when creating promises with long stack support", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q().then(() => {
      throw new Error("Test error");
    });

    return promise.catch((error: any) => {
      // The stack trace should contain valid file/line information
      expect(error.stack).toBeDefined();
      expect(error.stack.length).toBeGreaterThan(0);

      // The stack should contain our test file information
      expect(error.stack).toContain("stack trace parsing");
    });
  });
});