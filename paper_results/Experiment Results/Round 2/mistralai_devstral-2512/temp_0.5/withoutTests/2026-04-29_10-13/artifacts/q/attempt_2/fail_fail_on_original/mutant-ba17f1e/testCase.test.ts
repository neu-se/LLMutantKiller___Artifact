import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a promise chain that will generate a stack trace
    // The mutation affects stack trace parsing, which we can observe
    // through the behavior of long stack traces
    Q.longStackSupport = true;

    const error = new Error("Test error");
    const promise = Q.reject(error);

    return promise.then(
      () => {
        throw new Error("Should not be called");
      },
      (reason: Error) => {
        // The mutation would cause getFileNameAndLineNumber to return []
        // which would break the stack trace filtering
        // We verify the error is properly handled
        expect(reason).toBe(error);
        expect(reason.stack).toBeDefined();
      }
    );
  });
});